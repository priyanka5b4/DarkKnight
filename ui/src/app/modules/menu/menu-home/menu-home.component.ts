import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category, Menu } from 'src/app/shared/types/menuTypes';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { MenuService } from '../menu-service/menu-service.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@UntilDestroy()
@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss'],
})
export class MenuHomeComponent implements OnInit {
  menu = new BehaviorSubject<Menu>(this.route.snapshot.data.menu);
  shouldShow = true;
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private menuService: MenuService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.menu.next(this.route.snapshot.data.menu);
    console.log(this.route.snapshot.data.menu);
  }

  createCategory() {
    const curValue = this.menu.value;
    curValue.categories.push({ cname: 'New Category', products: [] });
    this.menuService.updateMenu(curValue).subscribe(
      (res) => {
        this.toaster.success('Created a new category successfully');
        this.menu.next(curValue);
      },
      (err) => {
        this.toaster.error('Error in creating Menu');
      }
    );
  }

  editCategory(event: any, category: Category) {
    event.stopPropagation();
    console.info(category);
    this.dialog
      .open(CategoryEditComponent, {
        data: category,
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          console.info(res);
          this.updateCategory(res);
        }
      });
  }

  updateCategory(category: Category) {
    const curValue = this.menu.value;
    curValue.categories = curValue.categories.map((cat) => (cat._id == category._id ? category : cat));
    this.menuService.updateMenu(curValue).subscribe(
      (res) => {
        this.toaster.success('Updated category successfully');
        this.menu.next(curValue);
      },
      (err) => {
        this.toaster.error('Error in updating Category');
      }
    );
  }
}
