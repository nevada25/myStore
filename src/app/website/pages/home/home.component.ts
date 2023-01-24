import {Component, OnInit} from '@angular/core';
import {StoreService} from "../../../services/store.service";
import {ProductsService} from "../../../services/products.service";
import {Unsubscribable} from "rxjs";
import {Product} from "../../../model/product.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private productsUnsubscribable: Unsubscribable | undefined;
  products: Product[] = [];

  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
  ) {
  }

  ngOnInit(): void {
    this.productsUnsubscribable = this.productService.getAllProduct(10, 0).subscribe(
      data => {
        this.products = data;
        this.offset += this.limit
      }
    )
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log(this.productId);
    });
  }

  loadMore() {
    this.productService.getAllProduct(this.limit, this.offset).subscribe(
      data => {
        this.products = this.products.concat(data);
        this.offset += this.limit
      }
    )
  }
}
