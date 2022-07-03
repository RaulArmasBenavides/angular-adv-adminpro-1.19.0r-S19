import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Param } from '../../../models/param.model';
import { Personal } from '../../../models/personal.model';
import { ControloperacionService } from '../../../services/controloperacion.service';
import { Group} from 'src/app/models/tienda.model';

const data = [
  {
    "acc_id": 1001,
    "acc_desc": "Administration"
  },

  {
    "acc_id": 1002,
    "acc_desc": "Laboratory"
  },

  {
    "acc_id": 1003,
    "acc_desc": "Staff"
  },

  {
    "acc_id": 1004,
    "acc_desc": "Office-1"
  },
  {
    "acc_id": 1005,
    "acc_desc": "Office-2"
  },
  {
    "acc_id": 1006,
    "acc_desc": "Office-2"
  }
];

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})

export class PersonalComponent implements OnInit {

  public isLoading: boolean = true;
  displayedColumns: string[] = ['Nombre', 'Apellidos', 'DNI','Cargo','estatus_dot', 'Tienda','actions'];
  public listapersonal = new MatTableDataSource<Personal | Group>([]);
  public liststatus:Param[] = [];
  acc_desc: any;
  public groupByColumns: string[] = ['Tienda'];
  constructor( private copservice: ControloperacionService) { }

  displayedColumns1 = ['idParam', 'Nombre'];
  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

private paginator: MatPaginator;

@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
  this.listapersonal.paginator = this.paginator;
}

  ngOnInit(): void {
     this.cargarListPersonalStatus();
     this.acc_desc = this.liststatus;
     this.cargarPersonal();
     this.listapersonal.filterPredicate = this.customFilterPredicate.bind(this);
     this.listapersonal.paginator =  this.paginator;
  }

  cargarPersonal() {
    this.isLoading =true;
    this.copservice.cargarPersonal()
       .subscribe( (personal: Personal[]) => {
         this.listapersonal.data = personal;
         this.isLoading =false;
         this.listapersonal.data = this.addGroups(personal, this.groupByColumns);
      });
  }

  customFilterPredicate(data: Personal | Group, filter: string): boolean {
     return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: Personal): boolean {
    const groupRows = this.listapersonal.data.filter(
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
    this.listapersonal.filter = performance.now().toString();  // hack to trigger filter refresh
  }

  addGroups(data: Personal[], groupByColumns: string[]): Personal[] {
    var rootGroup = new Group();
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(data: Personal[], level: number, groupByColumns: string[], parent: Group): Personal[] {
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
    this.listapersonal.filter = filterValue.trim().toLowerCase();
  }

   cargarListPersonalStatus() {
    this.copservice.cargarListPersonalStatus()
      .subscribe( (status: Param[]) => {
        this.liststatus = status;
      })
  }

  

}
