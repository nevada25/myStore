import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CreateUserDTO, User} from "../model/user.model";
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {Auth} from "../model/auth.model";
import {TokenService} from "./token.service";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.url}/api/auth`;
  private user = new BehaviorSubject<User|null>(null);

  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) {
  }

  login(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${this.url}/login`, {
      email,
      password
    }).pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  loginAndGet(email: string, password: string): Observable<User> {
    return this.login(email, password).pipe(
      switchMap(() => this.profile())
    )
  }

  profile(): Observable<User> {
    return this.http.get<User>(`${this.url}/profile`)
      .pipe(
        tap(user=>this.user.next(user))
      );
  }


  logout(){
    this.tokenService.removeToken();
  }
}
