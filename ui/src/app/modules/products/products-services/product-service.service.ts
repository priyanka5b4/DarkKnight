import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseTypes } from 'src/app/shared/types/httpResponses';
import { Product } from 'src/app/shared/types/menuTypes';
import { ProductFormComponent } from '../product-form/product-form.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit{
  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http:HttpClient ,private router: Router,private route: ActivatedRoute, private dialog: MatDialog, private toasterService: ToastrService) {
    
  }

  ngOnInit(): void {
      this.products.next(this.route.snapshot.data.products);
  }

  createEmptyProduct(): Observable<ResponseTypes.Genric | Product> {
    return this.http.post('/api/products', { empty: true }) as Observable<ResponseTypes.Genric | Product>;
  }

  getProducts() {
    return this.http.get('/api/products/all') as Observable<Product[]>;
  }

  updateProduct(product: Product) {
    return this.http.put(`/api/products/${product._id}`,{ body: product});
  }

  deleteProducts(product: Product) {
    return this.http.delete(`/api/products/${product._id}`, { body: product });
  }

  

  
}
