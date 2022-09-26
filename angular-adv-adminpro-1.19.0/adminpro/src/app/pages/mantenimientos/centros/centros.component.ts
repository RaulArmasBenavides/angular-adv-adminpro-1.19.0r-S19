import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {CentroVacunacion} from '../../../interfaces/centro.interface'


const ELEMENT_DATA: CentroVacunacion[] = [
  {nombre: "Parque1", direccion: 'Av. La Marina 123', distrito:'San Miguel'},
  {nombre: "Parque2", direccion: 'Av. La Marina 125', distrito:'San Luis'},
  {nombre: "Parque3", direccion: 'Av. La Marina 126', distrito:'Jesus María'},
  {nombre: "Parque4", direccion: 'Av. La Marina 123', distrito:'San Miguel'},
  {nombre: "Parque5", direccion: 'Av. La Marina 125', distrito:'San Luis'},
  {nombre: "Parque6", direccion: 'Av. La Marina 126', distrito:'Jesus María'},
];

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {
  //displayedColumns: string[] = ['nombre', 'direccion', 'distrito'];
  displayedColumns: string[] = ['codigo', 'descripcion', 'precio'];
  dataSource:any;//'ELEMENT_DATA;
  datos: Articulo[] = [];
  //datos de fechas 
  date = new Date((new Date().getTime())); 
  myDate = Date.now();    //date 
  constructor() { }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  ngOnInit(): void {
    for (let x = 1; x <= 100; x++)
    this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator =  this.paginator;

    console.log(this.date);
    console.log(this.myDate);
  }

}

export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
}
}
