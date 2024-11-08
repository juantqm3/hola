import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ToastModule } from 'primeng/toast';
import { Tipo } from '../models/tipo';
import { Marca } from '../models/marca';
import { Coche } from '../models/coche';
import { MarcaService } from '../services/marca.service';
import { TipoService } from '../services/tipo.service';
import { CocheService } from '../services/coche.service';
@Component({
  selector: 'app-coche',
  standalone: true,
  imports: [TableModule, ButtonModule,DialogModule,RouterModule,InputTextModule,
    FormsModule,ConfirmDialogModule,ToastModule],
  templateUrl: './coche.component.html',
  styleUrl: './coche.component.css'
})
export class CocheComponent {
  tipos:Tipo[]=[];
  marcas:Marca[]=[];
  coches:Coche[]=[];
  visible:boolean=false;
  isDeleteInProgress:boolean=false;
  coche=new Coche();
  titulo:string='';
  opc:string='';
  constructor(
    private marcaService: MarcaService,
    private tipoService: TipoService,
    private cocheService:CocheService
  ){}
  ngOnInit(){
    this.listarCoches();
  }
  listarTipos(){
    this.tipoService.getTipos().subscribe((data)=>{
      this.tipos=data;
    });
  }
  listasMarcas(){
    this.marcaService.getMarcas().subscribe((data)=>{
      this.marcas=data;
    });
  }
  listarCoches(){
    this.cocheService.getCoches().subscribe((data)=>{
      this.coches=data;
    });
  }
  showDialogCreate(){}
  showDialogEdit(id:number){}
  deleteCoche(id:number){}
  opcion(){}
}
