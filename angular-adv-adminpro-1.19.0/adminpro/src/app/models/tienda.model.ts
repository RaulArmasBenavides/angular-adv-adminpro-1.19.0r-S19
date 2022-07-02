export class Tienda {

    constructor(
        public idTienda: number,
        public Nombre: string,
        public dot_teo_ft:number,
        public dot_teo_pt:number,
        public jefe_zonal:string,
        public rol_creat: string,
        public fec_regt: string,
        public Distrito : string,
        public iddistrito: String,
        public Estado : string,
        public Direccion: string,
        public img?: string
    ) {}

}

export class Control {

    constructor(
        public nombre: string,
        public jefe_zonal:string,
        public dot_teo_ft:number,
        public dot_teo_pt:number,
        public NManosenTienda:number,
        public NEntradas:number,
        public NSalidas:number
    ) {}

}


export class Group {
    level: number = 0;
    parent: Group;
    expanded: boolean = true;
    get visible(): boolean {
      return !this.parent || (this.parent.visible && this.parent.expanded);
    }
  }
  