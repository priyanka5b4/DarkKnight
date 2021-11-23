import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Menu, Product, ProductCardActionIndex, ProductCardActions } from 'src/app/shared/types/menuTypes';
import { MenuService } from '../menu-service/menu-service.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@UntilDestroy()
@Component({
  selector: 'app-menu-landing',
  templateUrl: './menu-landing.component.html',
  styleUrls: ['./menu-landing.component.scss'],
})
export class MenuLandingComponent implements OnInit {
  menus = new BehaviorSubject<Menu[]>([]);
  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  productCardActions: ProductCardActions[] = [{ icon: 'edit', onClickFunction: 'editProduct' }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private toasterService: ToastrService,
    public domSanitizer: DomSanitizer,
    private dialog: MatDialog
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

  openMenu(id: string) {
    console.log(id);
    this.router.navigate([id], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.menus.next(this.route.snapshot.data.menus);
    this.products.next(this.route.snapshot.data.products);
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
}
