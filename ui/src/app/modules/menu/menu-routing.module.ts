import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { MenuLandingComponent } from './menu-list/menu-landing.component';
import { MenuResolver } from '../resolvers/menu.resolver';
import { MenusResolver } from '../resolvers/menus.resolver';
import { ProductsResolver } from '../resolvers/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: MenuLandingComponent,
    resolve: {
      menus: MenusResolver,
     },
  },
  {
    path: ':id',
    component: MenuHomeComponent,
    resolve: {
      menu: MenuResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
