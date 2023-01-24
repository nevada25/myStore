import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from "../../../services/store.service";
import {User} from "../../../model/user.model";
import {switchMap, Unsubscribable} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {CategoriesService} from "../../../services/categories.service";
import {Category} from "../../../model/product.model";
import {ca} from "date-fns/locale";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];
  categoriesUnsubscribable: Unsubscribable | null = null;

  constructor(private storeService: StoreService,
              private router:Router,
              private categoryService: CategoriesService,
              private authService: AuthService,) {

  }

  ngOnDestroy() {
    if (this.categoriesUnsubscribable) {
      this.categoriesUnsubscribable.unsubscribe();
    }
  }

  ngOnInit() {
      this.authService.user$.subscribe(user=>
    {
      this.profile=user;
    });
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
    this.getAllCategory();
  }

  login() {
    this.authService.loginAndGet('test5@test5.com',
      '12345678').subscribe(user => {
      this.router.navigate(['/profile'])
    });
  }
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategory() {
    this.categoriesUnsubscribable = this.categoryService.getAll( ).subscribe(categories => {
      this.categories = categories;
    });
  }

  logout() {
    this.authService.logout();
    this.profile=null;
    this.router.navigate(['/home'])
  }
}

