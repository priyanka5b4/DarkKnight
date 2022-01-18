import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';

@NgModule({
  declarations: [ProductFormComponent, ProductsGridComponent,ProductsComponent, ProductsListComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule.forRoot()],
  exports: [ProductsGridComponent]
})
export class ProductsModule {}
