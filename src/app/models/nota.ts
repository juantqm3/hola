// nota.ts
import { Alumno } from './alumno';
import { Curso } from './curso';

export class Nota {
  id: number;
  alumno: Alumno;
  curso: Curso;
  nota1: number;
  nota2: number;
  nota3: number;

  constructor(
    id: number,
    alumno: Alumno,
    curso: Curso,
    nota1: number,
    nota2: number,
    nota3: number
  ) {
    this.id = id;
    this.alumno = alumno;
    this.curso = curso;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
  }

  getPromedio(): number {
    return (this.nota1 + this.nota2 + this.nota3) / 3;
  }
}
