import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Tienda,Control,Distrito } from '../models/tienda.model';
import {Requerimiento} from '../models/reque.model';
import { Personal } from '../models/personal.model';
import { Param } from '../models/param.model';
const base_url = environment.base_urltamb;


@Injectable({
  providedIn: 'root'
})
export class ControloperacionService {

  constructor(private http: HttpClient) { }


  get headers() {
    return {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }


  //SINCRONIZACIÓN CON GEOVICTORIA 
  SyncGeoVictoriaData() {
    const url = `${ base_url }/Empleado/SyncGeoVictoriaAsync`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean }) => resp.codigo )
              );
  }

  //TIENDAS
  cargarTiendas() {
    const url = `${ base_url }/Tienda/TiendaListar`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean, listajson: Tienda[] }) => resp.listajson )
              );
  }

  obtenerTiendaPorId( id: number ) {
    console.log("test");
    console.log(JSON.stringify(id));
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(id);
    const url = `${ base_url }/Tienda/TiendaBuscar`;
    let res =  this.http.post( url,`{\n	"id":${id},\n}`,{'headers':headers}) 
    .pipe(
      map( (resp: {Codigo: boolean, Entidad: Tienda }) => resp.Entidad )
    )
    return res;
  }
 
  RegistrarTienda( tiendaTO:any ) {
    const url = `${ base_url }/Tienda/TiendaAdicionar`;
    const headers = { 'content-type': 'application/json'}  
    return this.http.post( url, JSON.stringify(tiendaTO), {'headers':headers} );
  }
  
  ActualizarTienda( tiendaTO: any  ) {
    const url = `${ base_url }/Tienda/TiendaActualizar`;
    const headers = { 'content-type': 'application/json'}  
    //return this.http.put( url, tienda);//, this.headers );
    return this.http.post( url, JSON.stringify(tiendaTO), {'headers':headers} );
  }

  cargarDistritos() {
    const url = `${ base_url }/Tienda/DistritosListar`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean, listajson: Distrito[] }) => resp.listajson )
              );
  }

  //CONTROL
  cargarControl() {
    const url = `${ base_url }/Tienda/TiendasControl`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean, listajson: Control[] }) => resp.listajson )
              );
  }

  //PERSONAL
  cargarPersonal() {

    const url = `${ base_url }/Empleado/EmpleadoListar`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean, listajson: Personal[] }) => resp.listajson )
              );
  }



  //REQUERIMIENTO
  cargarRequerimientos() {
    const url = `${ base_url }/Reque/RequeListar`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean, listajson: Requerimiento[] }) => resp.listajson )
              );
  }



   //PARÁMETROS
  cargarListPersonalStatus() {
    const url = `${ base_url }/Param/ListarPersonalStatus`;
    return this.http.get( url)
              .pipe(
                map( (resp: {codigo: boolean, listajson: Param[] }) => resp.listajson )
              );
  }

  actualizarPersonalStatusDotacion( _id: string, estatus_dot: string  ) {
    const url = `${ base_url }/Empleado/EmpleadoActualizarStatusDot/${ _id }`;
    return this.http.put( url, { estatus_dot }, this.headers );
  }



}
