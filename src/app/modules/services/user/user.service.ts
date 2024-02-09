import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environments.BASE_URL}/auth/login`, { username, password }).pipe(
      map(user => {
        sessionStorage.setItem('currentUser', JSON.stringify(user)); // Store user data in sessionStorage
        return user;
      })
    );
  }

  getUser(): any {
    const currentUser = sessionStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${environments.BASE_URL}/auth/register`, user);
  }

  logout(token: string): Observable<any> {
    sessionStorage.removeItem('currentUser'); // Remove user data from sessionStorage on logout
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<any>(`${environments.BASE_URL}/auth/logout`, {}, httpOptions);
  }
}