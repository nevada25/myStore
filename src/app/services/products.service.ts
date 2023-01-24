import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {catchError, map, Observable, retry, throwError, zip} from "rxjs";
import {Product, ProductCreateDTO, UpdateProductDTO} from "../model/product.model";
import {environment} from "../../environments/environment";
import {checkTime} from "../interceptors/time.interceptor";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = `${environment.url}/api`;

  constructor(private http: HttpClient) {
  }

  getParamsLimitAndOffset(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return params
  }

  getByCategory(categoryId: string, limit?: number, offset?: number): Observable<Product[]> {

    return this.http.get<Product[]>(`${this.url}/categories/${categoryId}/products`, {
      params: this.getParamsLimitAndOffset(limit, offset)
    })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .18 * item.price
          }
        }))
      );
  }

  getAllProduct(limit?: number, offset?: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`, {params: this.getParamsLimitAndOffset(limit, offset)})
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .18 * item.price
          }
        }))
      );
  }

  readAndUpdate(id: string, update: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, update)
    ).pipe();
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => new Error(`Algo esta fallando en el server`));
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error(`El  producto no existe`).message);
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => new Error(`No estas permitido `));
        }
        return throwError(() => new Error(`Ups algo salio mal`));
      })
    );
  }

  create(product: ProductCreateDTO): Observable<Product> {
    return this.http.post<Product>(`${this.url}/products`, product).pipe();
  }

  update(id: string, product: UpdateProductDTO): Observable<Product> {
    return this.http.put<Product>(`${this.url}/products/${id}`, product).pipe();
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/products/${id}`).pipe();
  }
}
