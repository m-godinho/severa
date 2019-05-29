import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { User } from '@app/core/models/User';
import { Observable } from 'rxjs';

interface UserCredentials {
  username: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  login(userCredentials: UserCredentials) {
    return this.httpClient.post(`${environment.server}login`, userCredentials);
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.server}user`);
  }

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.server}user/` + userId);
  }

  post(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.server}user`, user);
  }

  update(user: User): Observable<User> {
    return this.httpClient.patch<User>(`${environment.server}user/` + user.id, user);
  }

  delete(userId: number): Observable<User> {
    return this.httpClient.delete<User>(`${environment.server}user/` + userId);
  }
}
