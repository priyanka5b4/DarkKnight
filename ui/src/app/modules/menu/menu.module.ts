import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { MenuLandingComponent } from './menu-list/menu-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    MenuHomeComponent,
    MenuLandingComponent,
    CategoryEditComponent,
  ],
  imports: [CommonModule, MenuRoutingModule, ProductsModule, SharedModule.forRoot()]
})
export class MenuModule {}
