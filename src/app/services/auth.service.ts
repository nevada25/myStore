import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CreateUserDTO, User} from "../model/user.model";
import {Observable, switchMap, tap} from "rxjs";
import {Auth} from "../model/auth.model";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.url}/api/auth`;

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
    return this.http.get<User>(`${this.url}/profile`);
  }


}
