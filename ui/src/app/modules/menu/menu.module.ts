import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { MenuLandingComponent } from './menu-landing/menu-landing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [MenuHomeComponent, MenuLandingComponent, ProductFormComponent],
  imports: [CommonModule, MenuRoutingModule, SharedModule.forRoot()],
})
export class MenuModule {}
