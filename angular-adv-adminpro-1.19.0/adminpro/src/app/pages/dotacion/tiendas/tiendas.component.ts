import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Tienda } from 'src/app/models/tienda.model';
import { ControloperacionService } from '../../../services/controloperacion.service';
@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  //public tiendas: Tienda[] = [];
  public tiendas = new MatTableDataSource<Tienda>([]);
  public isLoading: boolean = true;
  displayedColumns: string[] = ['Nombre', 'dot_teo_ft', 'dot_teo_pt','jefe_zonal','Distrito', 'Direccion','actions'];
  constructor( private copservice: ControloperacionService) { }

private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.tiendas.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.cargarTienda();
    this.tiendas.paginator =  this.paginator;
  }

  cargarTienda() {

    this.copservice.cargarTiendas()
       .subscribe( (tiendas: Tienda[]) => {
         this.tiendas.data = tiendas;
         this.isLoading =false;
      })

  }

}
