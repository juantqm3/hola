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
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-coche',
  standalone: true,
  imports: [TableModule, ButtonModule,DialogModule,RouterModule,InputTextModule,
    FormsModule,ConfirmDialogModule,ToastModule, DropdownModule],
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
  op = 0; 
  selectedMarca: Marca | undefined;
  selectedTipo: Tipo | undefined;
  constructor(
    private marcaService: MarcaService,
    private tipoService: TipoService,
    private cocheService:CocheService,
    private messageService: MessageService
  ){}
  ngOnInit(){
    this.listarCoches();
    this.listarTipos();
    this.listasMarcas();
  }
  listarTipos(){
    this.tipoService.getTipos().subscribe((data)=>{
      this.tipos=data;
      console.log(this.tipos)
    });
  }
  listasMarcas(){
    this.marcaService.getMarcas().subscribe((data)=>{
      this.marcas=data;
      console.log(this.marcas)
    });
  }
  listarCoches(){
    this.cocheService.getCoches().subscribe((data)=>{
      this.coches=data;
    });
  }
  showDialogCreate(){
    this.titulo="Crear Coche"
    this.opc="Save";   
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  showDialogEdit(id:number){
    this.titulo="Editar Categoría"
    this.opc="Editar"; 
   this.cocheService.getCocheById(id).subscribe((data)=>{
      this.coche=data; 
      this.op=1;     
   });    
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  deleteCoche(id:number){
    this.isDeleteInProgress = true;
    this.cocheService.deleteCoche(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Coche eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarCoches();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el Coche',
        });
      },
    });
  }
  opcion(){
    if(this.op==0){
      this.addCoche();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.editCoche();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }
  }
  addCoche(){
    this.cocheService.crearCoche(this.coche).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Coche Registrado',
        });
        this.listarCoches();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Crear el Coche',
        });
      },
    });    
    this.visible = false;
  }
  editCoche(){
    this.cocheService.updateCoche(this.coche,this.coche.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Coche Editado',
        });
        this.listarCoches();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar el Coche',
        });
      },
    });    
    this.visible = false;
  }
  limpiar(){
    this.titulo='';
    this.opc='';
    this.op = 0; 
    this.coche.id=0;
    this.coche.marca;
    this.coche.tipo;
    this.coche.puertas=0;
    this.coche.placa='';
  }
}
