import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControloperacionService } from '../../../services/controloperacion.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-sincgeo',
  templateUrl: './sincgeo.component.html',
  styleUrls: ['./sincgeo.component.css']
})
export class SincgeoComponent implements OnInit {

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
