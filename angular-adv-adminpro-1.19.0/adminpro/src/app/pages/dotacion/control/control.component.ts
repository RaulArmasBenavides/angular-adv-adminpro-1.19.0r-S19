import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Control } from 'src/app/models/tienda.model';
import { ControloperacionService } from '../../../services/controloperacion.service';
import { Group} from 'src/app/models/tienda.model';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  public isLoading: boolean = true;
  public tiendascontrol = new MatTableDataSource<Control | Group>([]);
  displayedColumns: string[] = ['Nombre', 'dot_teo_ft', 'dot_teo_pt','jefe_zonal','ManosenTienda', 'Entradas','Salidas'];
  public groupByColumns: string[] = ['jefe_zonal'];
  constructor( private copservice: ControloperacionService) { }
  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.tiendascontrol.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.cargarControl();
    this.tiendascontrol.filterPredicate = this.customFilterPredicate.bind(this);
    this.tiendascontrol.paginator =  this.paginator;
  }


  cargarControl() {
    this.isLoading =true;
    this.copservice.cargarControl()
       .subscribe( (personal: Control[]) => {
         this.tiendascontrol.data = personal;
         this.isLoading =false;
         this.tiendascontrol.data = this.addGroups(personal, this.groupByColumns);
      })
  }



  customFilterPredicate(data: Control | Group, filter: string): boolean {
    return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
 }

 getDataRowVisible(data: Control): boolean {
   const groupRows = this.tiendascontrol.data.filter(
      row => {
        if (!(row instanceof Group)) return false;
       
       let match = true;
       this.groupByColumns.forEach(
         column => {
           if (!row[column] || !data[column] || row[column] !== data[column]) match = false;
         }
        );
       return match;
     }
    );

    if (groupRows.length === 0) return true;
    if (groupRows.length > 1) throw "Data row is in more than one group!";
    const parent = <Group>groupRows[0];  // </Group> (Fix syntax coloring)

    return parent.visible && parent.expanded;
  }

 groupHeaderClick(row) {
   row.expanded = !row.expanded
   this.tiendascontrol.filter = performance.now().toString();  // hack to trigger filter refresh
 }

 addGroups(data: Control[], groupByColumns: string[]): Control[] {
   var rootGroup = new Group();
   return this.getSublevel(data, 0, groupByColumns, rootGroup);
 }

 getSublevel(data: Control[], level: number, groupByColumns: string[], parent: Group): Control[] {
   // Recursive function, stop when there are no more levels. 
   if (level >= groupByColumns.length)
     return data;

   var groups = this.uniqueBy(
     data.map(
       row => {
         var result = new Group();
         result.level = level + 1;
         result.parent = parent;
         for (var i = 0; i <= level; i++)
           result[groupByColumns[i]] = row[groupByColumns[i]];
         return result;
       }
     ),
     JSON.stringify);

   const currentColumn = groupByColumns[level];

   var subGroups = [];
   groups.forEach(group => {
     let rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn])
     let subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
     subGroup.unshift(group);
     subGroups = subGroups.concat(subGroup);
   })
   return subGroups;
 }

 uniqueBy(a, key) {
   var seen = {};
   return a.filter(function (item) {
     var k = key(item);
     return seen.hasOwnProperty(k) ? false : (seen[k] = true);
   })
 }

 isGroup(index, item): boolean {
   return item.level;
 }

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.tiendascontrol.filter = filterValue.trim().toLowerCase();
}


}
