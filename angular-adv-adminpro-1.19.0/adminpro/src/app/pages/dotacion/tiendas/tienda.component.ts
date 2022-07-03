import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Tienda,Distrito } from 'src/app/models/tienda.model';
import { ControloperacionService } from '../../../services/controloperacion.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  public tiendaForm: FormGroup;
  public tiendas: Tienda[] = [];
  public distritos: Distrito[] = [];
  public tiendaSeleccionada: Tienda;
  public DistritoSeleccionado: Distrito;
  constructor(
    private fb: FormBuilder,
    private copservice: ControloperacionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  
  this.activatedRoute.params
  .subscribe( ({ idTienda }) => this.cargarDatosTienda( idTienda ) );

  this.tiendaForm = this.fb.group({
     idTienda: [''],
     Nombre: [''],
     dot_teo_ft : ['',Validators.required],
     dot_teo_pt :['',Validators.required],
     jefe_zonal :['',Validators.required],
     iddistrito : [''],
     Direccion : [''],
     Distrito : [''],
  });

  //this.cargarTiendas();
  this.cargarDistritos();
}

//métodos de servicios
  cargarTiendas() {
    this.copservice.cargarTiendas()
      .subscribe( (tiendas: Tienda[]) => {
        this.tiendas = tiendas;
      })
  }

  cargarDistritos() {
    this.copservice.cargarDistritos()
      .subscribe( (distritos: Distrito[]) => {
        this.distritos = distritos;
        console.log(this.distritos);
      })
  }

  cargarDatosTienda(id: number) {

    if ( id == 0 ) {
      return;
    }
    
     this.copservice.obtenerTiendaPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( tienda => {

        console.log(tienda);

        if ( !tienda ) {
          return this.router.navigateByUrl(`/dashboard/tiendas`);
        }
        const { idTienda,Nombre,dot_teo_pt,dot_teo_ft,jefe_zonal,iddistrito,Direccion,Distrito } = tienda; 
        this.tiendaSeleccionada = tienda;
        this.tiendaForm.setValue({ idTienda,Nombre,dot_teo_ft,dot_teo_pt,jefe_zonal,iddistrito,Direccion,Distrito });
      });

  }

  guardarTienda() {
    this.tiendaForm.get('Distrito').valueChanges
    .subscribe( iddistrito => {
      this.DistritoSeleccionado = this.distritos.find( distrito => distrito.iddistrito === iddistrito );
    });
    const { idTienda,Nombre,dot_teo_ft,dot_teo_pt,jefe_zonal,Direccion } = this.tiendaForm.value;
    const objTienda = {
      tienda: {
        idTienda: idTienda,
        Nombre:Nombre,
        dot_teo_ft:dot_teo_ft,
        dot_teo_pt:dot_teo_pt,
        jefe_zonal:jefe_zonal,
        iddistrito:this.tiendaForm.get('Distrito').value,
        Direccion: Direccion
      },
    };
    console.log(objTienda);
   if ( this.tiendaSeleccionada ) {
        this.copservice.ActualizarTienda(objTienda)
          .subscribe( resp => {
            Swal.fire('Tienda actualizada', `${ Nombre } actualizada correctamente`, 'success');
          })
      } else {
          // registrar Tienda
          this.copservice.RegistrarTienda(objTienda)
            .subscribe( (resp: any) => {
              Swal.fire('Tienda Creada', `${ Nombre } creado correctamente`, 'success');
              this.router.navigateByUrl(`/dashboard/tienda/${ resp.Entidad.idTienda }`)
          })
       }
      }
}
