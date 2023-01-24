import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from "../../../services/store.service";
import {User} from "../../../model/user.model";
import {switchMap, Unsubscribable} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {CategoriesService} from "../../../services/categories.service";
import {Category} from "../../../model/product.model";
import {ca} from "date-fns/locale";

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
              private categoryService: CategoriesService,
              private authService: AuthService,) {
  }

  ngOnDestroy() {
    if (this.categoriesUnsubscribable) {
      this.categoriesUnsubscribable.unsubscribe();
    }
  }

  ngOnInit() {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
    this.getAllCategory();
  }

  login() {
    this.authService.loginAndGet('test5@test5.com',
      '12345678').subscribe(user => {
      this.profile = user;
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
}

