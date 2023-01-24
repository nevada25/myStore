import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CreateUserDTO, User} from "../model/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = `${environment.url}/api/users`;

  constructor(private http: HttpClient) {
  }

  create(dto: CreateUserDTO): Observable<User> {
    return this.http.post<User>(`${this.url}`, dto);
  }

  getAll(dto: CreateUserDTO): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`);
  }
}
