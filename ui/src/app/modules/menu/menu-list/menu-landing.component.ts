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


@UntilDestroy()
@Component({
  selector: 'app-menu-landing',
  templateUrl: './menu-landing.component.html',
  styleUrls: ['./menu-landing.component.scss'],
})
export class MenuLandingComponent implements OnInit {
  menus = new BehaviorSubject<Menu[]>([]);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private toasterService: ToastrService,
    public domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    
  ) {
    //this.editProduct.bind(this.dialog);
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


  openMenu(id: string) {
    console.log(id);
    this.router.navigate([id], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.menus.next(this.route.snapshot.data.menus);
    
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
              curMenus.slice(0, index).concat(curMenus.slice(index+1, curMenus.length))
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
