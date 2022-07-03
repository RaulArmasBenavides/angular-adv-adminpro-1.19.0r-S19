export class Requerimiento {

    constructor(
        public idRequerimiento:number,
        public sol_dot: string,
        public Tienda:string,
        public idTienda:number,
        public Motivo:string,
        public idMotivo: number,
        public fec_regt: string,
        public rol_creacion: string,
        public Descripcion : string,
        public img?: string
    ) {}

}