import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Menu } from 'src/app/shared/types/menuTypes';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss'],
})
export class MenuHomeComponent implements OnInit {
  menu = new BehaviorSubject<Menu>(this.route.snapshot.data.menu);
  shouldShow = true;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.menu.next(this.route.snapshot.data.menu);
    console.log(this.route.snapshot.data.menu);
  }

  createProduct() {}
}
