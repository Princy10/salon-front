import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/models/user'
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environments.BASE_URL}/auth/login`, { username, password });
  }

  register(username: string, password: string, role?: string): Observable<User> {
    return this.http.post<User>(`${environments.BASE_URL}/auth/register`, { username, password, role });
  }

  logout(token: string): Observable<any> {
    localStorage.removeItem('token');
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<any>(`${environments.BASE_URL}/auth/logout`, {}, httpOptions);
  }
}