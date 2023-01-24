import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {Product} from "../../../model/product.model";
import {switchMap, Unsubscribable} from "rxjs";

@Component({
  selector: 'app-category',
  template: '<app-products [products]="products" (loadMoreClick)="loadMore()" [productId]="productId"></app-products>',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryId: string | null = null;
  limit = 10;
  offset = 0;

  private productsUnsubscribable: Unsubscribable | undefined;
  products: Product[] = [];

  productId: string | null = null;
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnDestroy() {
    if (this.productsUnsubscribable != null) {
      this.productsUnsubscribable?.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: any) => {
        this.categoryId = params.get('id') as string;
        if (this.categoryId) {
          return this.productService.getByCategory(this.categoryId, this.limit, this.offset)
        }
        return [];
      })
    ).subscribe((data: Product[]) => {
      this.products = data;
    });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    });
  }

  loadMore() {
    if (this.categoryId) {
      this.productService.getByCategory(this.categoryId, this.limit, this.offset).subscribe(
        data => {
          this.products = this.products.concat(data);
          this.offset += this.limit
        }
      )
    }

  }
}
