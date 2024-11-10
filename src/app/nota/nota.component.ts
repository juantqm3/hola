import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { Alumno } from '../models/alumno';
import { Nota } from '../models/nota';
import { Curso } from '../models/curso';
import { AlumnoService } from '../services/alumno.service';
import { NotaService } from '../services/nota.service';
import { CursoService } from '../services/curso.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule, RouterModule, InputTextModule,
    FormsModule, ConfirmDialogModule, ToastModule, DropdownModule, CommonModule],
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent {
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];
  notas: Nota[] = [];
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  nota: Nota = new Nota(0, new Alumno(), new Curso(), 0, 0, 0); 
  titulo: string = '';
  opc: string = '';
  op = 0; 

  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private notaService: NotaService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarNotas();
    this.listarAlumnos();
    this.listarCursos();
  }

  listarAlumnos() {
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
      console.log(this.alumnos);
    });
  }

  listarCursos() {
    this.cursoService.getCursos().subscribe((data) => {
      this.cursos = data;
      console.log(this.cursos);
    });
  }

  listarNotas() {
    this.notaService.getNotas().subscribe((data) => {
      this.notas = data.map(notaData => new Nota(
        notaData.id,
        notaData.alumno,
        notaData.curso,
        notaData.nota1,
        notaData.nota2,
        notaData.nota3
      ));
    });
  }
  

  showDialogCreate() {
    this.titulo = "Crear Nota";
    this.opc = "Guardar";
    this.op = 0;
    this.nota = new Nota(0, new Alumno(), new Curso(), 0, 0, 0); // Resetea la instancia de Nota
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = "Editar Nota";
    this.opc = "Editar";
    this.op = 1;
    this.notaService.getNotaById(id).subscribe((data) => {
      this.nota = data;
    });
    this.visible = true;
  }

  deleteNota(id: number) {
    this.isDeleteInProgress = true;
    this.notaService.deleteNota(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Nota eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarNotas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la Nota',
        });
      },
    });
  }

  opcion() {
    if (this.op == 0) {
      this.addNota();
      this.limpiar();
    } else if (this.op == 1) {
      console.log("Editar");
      this.editNota();
      this.limpiar();
    } else {
      console.log("No se hace nada");
      this.limpiar();
    }
  }

  addNota() {
    this.notaService.crearNota(this.nota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Registrada',
        });
        this.listarNotas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Crear la Nota',
        });
      },
    });
    this.visible = false;
  }

  editNota() {
    this.notaService.updateNota(this.nota, this.nota.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Editada',
        });
        this.listarNotas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar la Nota',
        });
      },
    });
    this.visible = false;
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.nota = new Nota(0, new Alumno(), new Curso(), 0, 0, 0); // Limpia la instancia de Nota
  }
}
