import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsResolver } from '../resolvers/products.resolver';
import { ProductsListComponent } from './products-list/products-list.component';



const routes: Routes = [{ path: '', component: ProductsListComponent,  resolve: {products: ProductsResolver } },];

@NgModule({
 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
