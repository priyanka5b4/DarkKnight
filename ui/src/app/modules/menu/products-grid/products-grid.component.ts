import { Component, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Product, ProductCardActionIndex, ProductCardActions } from 'src/app/shared/types/menuTypes';
import { EventEmitter } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';


@UntilDestroy()
@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent implements OnInit{
  @Input()
  products: Product[] | null = [];

  @Input()
  productCardActions: ProductCardActions[] = [];

  @Input()
  componentInstance: any;

  constructor(public domSanitizer: DomSanitizer, private dialog: MatDialog){}
  ngOnInit(): void {
   
  }

  onClick(actionFunction: string, pIndex: number) {
    this.componentInstance[actionFunction](pIndex);
    // this.productActionClicked.emit({ actionFunction, productIndex: pIndex });
  }
}
