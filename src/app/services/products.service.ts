import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'; // Usamos tu interfaz existente

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private api_url = 'http://localhost:3000/api/productos';

  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api_url);
  }
}