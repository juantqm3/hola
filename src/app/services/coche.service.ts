import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
private apiUrl='http://localhost:8080/api/coches';
  constructor(private http:HttpClient) { }

  getCoches():Observable<Coche[]>{
    return this.http.get<Coche[]>(this.apiUrl);
  }

  getCocheById(id:number):Observable<Coche>{
    return this.http.get<Coche>(`${this.apiUrl}/${id}`);
  }

  crearCoche(coche:Coche):Observable<Coche>{
    return this.http.post<Coche>(this.apiUrl, Coche);
  }
  
  deleteCoche(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCoche(coche:Coche, id:number):Observable<Coche>{
    return this.http.post<Coche>(`${this.apiUrl}/${id}`, Coche);
  }
}
