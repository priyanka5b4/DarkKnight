import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenData, AuthenticationService } from '../../authentication/authentication.service';

interface NavListItem {
  icon: string;
  route: string;
  name: string;
}

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent implements OnInit {
  @Input()
  device!: String;

  tokenData: TokenData;

  commonItems: NavListItem[] = [
    { icon: 'home', route: 'home', name: 'Home' },
    { icon: 'list_alt', route: 'menu', name: 'Menus' },
    { icon: 'inventory_2', route: 'products', name: 'Prooducts' },
  ];

  mobileItems: NavListItem[] = [...this.commonItems];

  normalItems: NavListItem[] = [...this.commonItems];

  constructor(private router: Router, private authService: AuthenticationService) {
    this.tokenData = this.authService.getTokenData();
  }
  ngOnInit(): void {}

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('tokenData', '');
    this.router.navigate(['login']);
  }
}
