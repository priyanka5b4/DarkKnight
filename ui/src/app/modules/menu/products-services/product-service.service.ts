import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shared/types/menuTypes';
import { MenuService } from '../menu-service/menu-service.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private menuService: MenuService, private dialog: MatDialog, private toasterService: ToastrService) {
    this.editProduct.bind(this.dialog);
  }

  editProduct(index: number) {
    this.dialog
      .open(ProductFormComponent, {
        data: this.products.value[index],
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((res: Product) => {
        if (res) {
          this.products.value[index] = res;
        }
      });
  }

  createProduct() {
    this.menuService.createEmptyProduct().subscribe(
      (res) => {
        this.toasterService.success('Created Empty Product Successfully');
        const curProducts = this.products.value;
        curProducts.push(res as Product);
      },
      (err) => {
        this.toasterService.error(err);
      }
    );
  }
}
