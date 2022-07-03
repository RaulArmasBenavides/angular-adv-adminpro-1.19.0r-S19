import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Tienda,Control,Distrito } from '../models/tienda.model';
import {Requerimiento} from '../models/reque.model';
import { Personal } from '../models/personal.model';
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

  // RegistrarTienda( tiendaTO:JSON)//tiendaTO: { idTienda:Number , Nombre: string, dot_teo_ft: number,dot_teo_pt:number,jefe_zonal:string,iddistrito:number,Direccion:string,Distrito:string } ) {
  // { 
  //   const url = `${ base_url }/Tienda/TiendaAdicionar`;
  //   const headers = { 'content-type': 'application/json'}  
  //   console.log(tiendaTO);
  //   //return this.http.post( url, `{\n "tienda":{"Nombre":${tiendaTO.Nombre},"dot_teo_pt":2,"dot_teo_ft":2,"jefe_zonal":"Test1","Direccion":"Calle Fortunato Quezada 109","iddistrito":"5",\n}}`, {'headers':headers} );
  //   return this.http.post( url, tiendaTO, {'headers':headers} );
  // }

  // RegistrarTienda3( tiendaTO:FormData)//tiendaTO: { idTienda:Number , Nombre: string, dot_teo_ft: number,dot_teo_pt:number,jefe_zonal:string,iddistrito:number,Direccion:string,Distrito:string } ) {
  // { 
  //     const url = `${ base_url }/Tienda/TiendaAdicionar`;
  //     const headers = { 'content-type': 'application/json'}  
  //     console.log(tiendaTO);
  //     console.log(JSON.stringify(tiendaTO));
  //     return this.http.post( url, JSON.stringify(tiendaTO));
  // }
 
  RegistrarTienda( tiendaTO:any ) {
    const url = `${ base_url }/Tienda/TiendaAdicionar`;
    const headers = { 'content-type': 'application/json'}  
    console.log(tiendaTO);
    console.log(JSON.stringify(tiendaTO));
    return this.http.post( url, JSON.stringify(tiendaTO), {'headers':headers} );
  }

  


  
  ActualizarTienda( tienda: Tienda  ) {

    const url = `${ base_url }/Tienda/TiendaActualizar`;
    return this.http.put( url, tienda);//, this.headers );
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


}
