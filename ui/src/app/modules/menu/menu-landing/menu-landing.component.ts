import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ResponseTypes } from 'src/app/shared/types/httpResponses';
import { Menu, Product, ProductCardActionIndex, ProductCardActions } from 'src/app/shared/types/menuTypes';
import { MenuService } from '../menu-service/menu-service.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../products-services/product-service.service';

@UntilDestroy()
@Component({
  selector: 'app-menu-landing',
  templateUrl: './menu-landing.component.html',
  styleUrls: ['./menu-landing.component.scss'],
})
export class MenuLandingComponent implements OnInit {
  menus = new BehaviorSubject<Menu[]>([]);
  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  productCardActions: ProductCardActions[] = [
    { icon: 'edit', onClickFunction: 'editProduct' },
    { icon: 'delete', onClickFunction: 'deleteProduct' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private toasterService: ToastrService,
    public domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private productsService: ProductService
  ) {
    this.editProduct.bind(this.dialog);
  }

  createMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menuService.createEmptyMenu().subscribe(
      (res) => {
        this.toasterService.success('Created Empty Menu Successfully');
        const curMenus = this.menus.value;
        curMenus.push(res as Menu);
      },
      (err) => {
        this.toasterService.error(err);
      }
    );
  }

  createProduct(event: MouseEvent) {
    event.stopPropagation();
    this.productsService.createProduct();
  }

  openMenu(id: string) {
    console.log(id);
    this.router.navigate([id], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.menus.next(this.route.snapshot.data.menus);
    this.products.next(this.route.snapshot.data.products);
  }

  editProduct(index: number) {
    this.productsService.editProduct(index);
  }

  deleteItem(id: string): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent).afterClosed().pipe(untilDestroyed(this)) as Observable<boolean>;
  }

  deleteMenu(index: number) {
    const menu = this.menus.value[index];
    const id = menu._id;
    this.deleteItem(id).subscribe((userInput: boolean) => {
      if (userInput) {
        this.menuService.deleteMenu(menu).subscribe(
          (res) => {
            var curMenus = this.menus.value;

            this.menus = new BehaviorSubject<Menu[]>(
              curMenus.slice(1, index).concat(curMenus.slice(index, curMenus.length))
            );

            this.toasterService.success('deleted Successfully');
          },
          (err) => {
            this.toasterService.error(err);
          }
        );
      }
    });
  }

  deleteProduct(index: number) {
    const product = this.products.value[index];
    const id = product._id;
    this.deleteItem(id).subscribe((userInput: boolean) => {
      if (userInput) {
        this.menuService.deleteProducts(product).subscribe(
          (res) => {
            var curMenus = this.products.value;

            this.products = new BehaviorSubject<Product[]>(
              curMenus.slice(1, index).concat(curMenus.slice(index + 1, curMenus.length))
            );
            this.toasterService.success('deleted Successfully');
          },
          (err) => {
            this.toasterService.error(err);
          }
        );
      }
    });
  }
}
