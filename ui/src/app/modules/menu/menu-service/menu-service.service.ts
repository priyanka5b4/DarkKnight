import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTypes } from 'src/app/shared/types/httpResponses';
import { Menu, Product } from 'src/app/shared/types/menuTypes';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  createEmptyMenu(): Observable<ResponseTypes.Genric | Menu> {
    return this.http.post('/api/menu', { empty: true }) as Observable<ResponseTypes.Genric | Menu>;
  }

  getMenu(id: string) {
    return this.http.get(`/api/menu/${id}`) as Observable<Menu>;
  }

  getMenus() {
    return this.http.get(`/api/menu/all`) as Observable<Menu[]>;
  }

  createEmptyProduct(): Observable<ResponseTypes.Genric | Product> {
    return this.http.post('/api/products', { empty: true }) as Observable<ResponseTypes.Genric | Product>;
  }

  getProducts() {
    return this.http.get('/api/products/all') as Observable<Product[]>;
  }

  updateProduct(body: Product) {
    return this.http.put(`/api/products/${body._id}`, body);
  }
}
