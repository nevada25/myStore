import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {switchMap} from "rxjs";
import {Product} from "../../../model/product.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductsService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: any) => {
        this.productId = params.get('id') as string;
        if (this.productId) {
          return this.productService.getProduct(this.productId)
        }
        return [];
      })
    ).subscribe((data: Product) => {
      this.product = data;
    });
  }

  goToBack() {
    this.location.back();
  }
}
