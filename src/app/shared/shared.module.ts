import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImgComponent} from "./components/img/img.component";
import {ProductComponent} from "./components/product/product.component";
import {ProductsComponent} from "./components/products/products.component";
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {VocalesPipe} from "./pipes/vocales.pipe";
import {ReversePipe} from "./pipes/reverse.pipe";
import {HighlightDirective} from "./directives/highlight.directive";
import {SwiperModule} from "swiper/angular";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent, ReversePipe,
    TimeAgoPipe,
    VocalesPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent, ReversePipe,
    TimeAgoPipe,
    VocalesPipe,
    HighlightDirective,
  ]
})
export class SharedModule {
}
