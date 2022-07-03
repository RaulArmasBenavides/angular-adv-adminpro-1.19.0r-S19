import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Tienda,Distrito } from 'src/app/models/tienda.model';
import { ControloperacionService } from '../../../services/controloperacion.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styleUrls: ['./requerimiento.component.css']
})
export class RequerimientoComponent implements OnInit {

  public requeForm: FormGroup;
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
    .subscribe( ({ idTienda }) => this.cargarDatosRequerimiento( idTienda ) );
  
    this.requeForm = this.fb.group({
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
    //this.cargarDistritos();

  }

  cargarDatosRequerimiento(id: number) {

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
        this.requeForm.setValue({ idTienda,Nombre,dot_teo_ft,dot_teo_pt,jefe_zonal,iddistrito,Direccion,Distrito });
      });
  }


  guardarRequerimiento() {
    this.requeForm.get('Distrito').valueChanges
    .subscribe( iddistrito => {
      console.log("entrando");
      console.log(iddistrito);
      console.log(this.distritos);
      this.DistritoSeleccionado = this.distritos.find( distrito => distrito.iddistrito === iddistrito );
    });
    // console.log(this.DistritoSeleccionado.iddistrito);
    console.log(this.requeForm.get('Distrito').value);
    console.log(this.requeForm.value);
    const { idTienda,Nombre,dot_teo_ft,dot_teo_pt,jefe_zonal,Direccion } = this.requeForm.value;
   if ( this.tiendaSeleccionada ) {
        //actualizar Tienda
        const data = {
          ...this.requeForm.value,
          _id: this.tiendaSeleccionada.idTienda
        }
        this.copservice.ActualizarTienda( data )
          .subscribe( resp => {
            Swal.fire('Actualizada', `${ Nombre } actualizado correctamente`, 'success');
          })
      } else {
          // registrar Tienda
          const objTienda = {
            tienda: {
              idTienda: idTienda,
              Nombre:Nombre,
              dot_teo_ft:dot_teo_ft,
              dot_teo_pt:dot_teo_pt,
              jefe_zonal:jefe_zonal,
              iddistrito:this.requeForm.get('Distrito').value,
              Direccion: Direccion
            },
          };
          this.copservice.RegistrarTienda(objTienda)
            .subscribe( (resp: any) => {
              Swal.fire('Tienda Creada', `${ Nombre } creado correctamente`, 'success');
              this.router.navigateByUrl(`/dashboard/tienda/${ resp.Entidad.idTienda }`)
          })
       }
      }


}
