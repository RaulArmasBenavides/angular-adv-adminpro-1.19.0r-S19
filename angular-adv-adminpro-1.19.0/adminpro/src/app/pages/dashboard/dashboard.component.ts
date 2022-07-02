import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControloperacionService } from '../../services/controloperacion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor( private copservice: ControloperacionService,
    private fb: FormBuilder) { }

  public geovictoriaForm: FormGroup;

  ngOnInit(): void {

    this.geovictoriaForm = this.fb.group({
       secreto: ['', Validators.required ],
       claveapi: ['', Validators.required ],
    });
  }

  Sincronizar() {
    this.copservice.SyncGeoVictoriaData( )
    .subscribe( resp => {
      Swal.fire('SINCRONIZACIÓN', `Se sincronizó la data de GEOVICTORIA correctamente`, 'success');
    })
  }


}
