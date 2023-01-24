import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product, ProductCreateDTO, UpdateProductDTO} from "../../../model/product.model";
import {switchMap, Unsubscribable} from "rxjs";
import {StoreService} from "../../../services/store.service";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  myShoppingCart: Product[]
  total = 0;
  private productUnsubscribable: Unsubscribable | undefined
  date = new Date(2023, 2, 20);
  showProductDetails = false;

  @Input() products: Product[] = []

  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }

  @Output() loadMoreClick = new EventEmitter<string>();
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: 0,
      name: ''
    }
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productService: ProductsService,
  ) {
    this.myShoppingCart = storeService.getMyShoppingCart();
  }

  ngOnDestroy() {
    if (this.productUnsubscribable != null) {
      this.productUnsubscribable.unsubscribe();
    }
  }


  onAddToShoppingCart(product: Product) {
    this.storeService.onAddToShoppingCart(product);
    this.total = this.storeService.getTotal();
  }


  toggleProductDetail() {
    this.showProductDetails = !this.showProductDetails;
  }

  readAndUpdate(id: string) {
    //PETICION DEPENDIENTE
    this.productService.getProduct(id)
      .pipe(
        switchMap((product) => this.productService.update(product.id, {title: 'change'}))
      ).subscribe(data => {
      console.log(data);
    });
    //PETICION PARALELO
    this.productService.readAndUpdate(id, {title: 'change'}).subscribe(response => {
      const read = response[0];
      const update = response[1];
    });
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if (!this.showProductDetails) {
      this.showProductDetails = true;
    }
    this.productUnsubscribable = this.productService.getProduct(id).subscribe(product => {
      this.productChosen = product;

      this.statusDetail = 'success';
    }, response => {
      alert(response)
      this.statusDetail = 'error';
    })
  }


  createNewProduct() {
    const product: ProductCreateDTO = {
      description: 'Producto  2',
      title: 'Titulo de Producto 2',
      price: 1000,
      images: [
        'https://www.w3schools.com/howto/img_avatar.png'
      ],
      categoryId: 1
    }
    this.productService.create(product).subscribe(product => {
      this.products.unshift(product);
    });
  }

  updateProduct() {
    const product: UpdateProductDTO = {
      title: 'Editar title',
    }
    this.productService.update(this.productChosen.id, product).subscribe(product => {
      const productIndex = this.products.findIndex(
        item => item.id == this.productChosen.id
      );
      this.products[productIndex] = product;
      this.productChosen = product;
    });
  }

  onDeletedProduct() {
    const id = this.productChosen.id;
    this.productService.delete(id)
      .subscribe(data => {
        if (data) {
          this.showProductDetails = false
          const productIndex = this.products.findIndex(item => item.id === id)
          this.products.splice(productIndex, 1);
        }
      })

  }


  loadMore() {
    this.loadMoreClick.emit("agregar");
  }
}
