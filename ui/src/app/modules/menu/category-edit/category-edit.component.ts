import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, Product } from 'src/app/shared/types/menuTypes';
import { MenuService } from '../menu-service/menu-service.service';
import { ProductFormComponent } from '../product-form/product-form.component';

interface categoryProduct {
  product: Product;
  isLinked: boolean;
}

@UntilDestroy()
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  categoryName: string = '';
  linkedProducts: Product[] = [];
  products = new BehaviorSubject<categoryProduct[]>([]);
  constructor(
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private formBuilder: FormBuilder,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryName = this.data.cname;
    this.linkedProducts = this.data.products;
    console.log(this.linkedProducts);
    this.menuService
      .getProducts()
      .pipe(
        untilDestroyed(this),
        map((res): categoryProduct[] => res.map<categoryProduct>((ele) => ({ isLinked: true, product: ele }))),
        map((res) =>
          res.map((product) => ({
            ...product,
            isLinked: this.linkedProducts.filter((ele) => ele._id === product.product._id).length !== 0,
          }))
        )
      )
      .subscribe((res) => {
        this.products.next(res);
      });
  }

  update() {
    const retObj = this.data;
    retObj.cname = this.categoryName;
    retObj.products = this.products.value.filter((ele) => ele.isLinked).map((ele) => ele.product);
    this.dialogRef.close(retObj);
  }
}
