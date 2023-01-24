import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryRoutingModule} from './category-routing.module';
import {CategoryComponent} from "./category.component";
import {QuicklinkModule} from "ngx-quicklink";


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    QuicklinkModule
  ]
})
export class CategoryModule {
}
