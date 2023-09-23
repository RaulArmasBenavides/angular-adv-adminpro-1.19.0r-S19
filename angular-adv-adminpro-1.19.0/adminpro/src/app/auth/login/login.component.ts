import { Component, OnInit, NgZone, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

 declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit {

  public formSubmitted = false;
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }

  ngOnInit(): void {
 
  }

  ngAfterViewInit() :void{
    this.googleInit();
  }

  googleInit(){
		google.accounts.id.initialize({
			 client_id: '273923021809-47kj07huaf1a636u5un4iaucpuacs76c.apps.googleusercontent.com',
			 callback:(response:any) => this.handleCredentialResponse(response)
		});
		google.accounts.id.renderButton( 
		  //document.getElementById("buttonDiv"),
		  this.googleBtn.nativeElement, 
		  {theme:"outline",size:"large"}
		);
	}


  login() {

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.get('remember').value ){ 
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al Dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });

  }
  
  handleCredentialResponse(response:any){
		this.usuarioService.loginGoogle(response.credential).subscribe(resp=>{
				console.log(resp);
				if(resp.ok){
					this.router.navigateByUrl('/main');
					// this.usuarioService.guardarLocalStorage(resp.token, "") //setToken(resp.token);
				}
			});
		 console.log("Encoded JWT ID token " + response.credential)
	  }
   

 

}
