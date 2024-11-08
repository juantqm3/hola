import { Marca } from "./marca";
import { Tipo } from "./tipo";


export class Coche {
    id:number;
    placa:string;
    puertas:number;
    marca:Marca;
    tipo:Tipo
    constructor(id:number = 0,placa:string='',puertas:number=0, marca:Marca=new Marca(),tipo:Tipo=new Tipo()){
        this.id=id;
        this.placa=placa;
        this.puertas=puertas;
        this.marca=marca;
        this.tipo=tipo;
    }
}
