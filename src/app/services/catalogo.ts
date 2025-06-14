import { inject, Injectable } from '@angular/core';
import { Categoria, Produto } from '../interfaces/Catalogo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private http = inject(HttpClient);
  urlbase = 'http://localhost:8000';

  getCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.urlbase}/categorias/`);
  }

  getProduto(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.urlbase}/produtos/`)
  }
  getFiltered(categoria_id:string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.urlbase}/produtos/?categoria=${categoria_id}`)
  }
}
