import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Requerimiento } from 'src/app/models/reque.model';
import { ControloperacionService } from '../../../services/controloperacion.service';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {

  public requerimientos = new MatTableDataSource<Requerimiento>([]);
  public isLoading: boolean = true;
  displayedColumns: string[] = ['sol_dot', 'Tienda', 'Motivo','Descripcion','actions'];
  constructor( private copservice: ControloperacionService) { }

  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.requerimientos.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.cargarRequerimientos();
    this.requerimientos.paginator =  this.paginator;
  }

  cargarRequerimientos() {
    this.copservice.cargarRequerimientos()
       .subscribe( (requerimientos: Requerimiento[]) => {
         this.requerimientos.data = requerimientos;
         this.isLoading =false;
      })
  }

   //filtering 
    doFilter = (value:string) => {    
      this.requerimientos.filter = value;
   }

}
