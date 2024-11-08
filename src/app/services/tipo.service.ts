import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private apiUrl='http://localhost:8080/api/marcas';
  constructor(private http:HttpClient) { }

  getTipos():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.apiUrl);
  }
  
}
