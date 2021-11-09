import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { Menu } from 'src/app/shared/types/menuTypes';
import { MenuService } from '../menu-service/menu-service.service';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss'],
})
export class MenuHomeComponent implements OnInit {
  menu = new BehaviorSubject<Menu>(this.route.snapshot.data.menu);
  shouldShow = true;
  constructor(private route: ActivatedRoute, private menuService: MenuService, private toaster: ToastrService) {}

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
}
