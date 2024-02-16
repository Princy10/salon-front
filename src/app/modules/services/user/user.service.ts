import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/modules/models/user'
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environments.BASE_URL}/auth/login`, { username, password }).pipe(
      map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  register(user: any): Observable<User> {
    return this.http.post<User>(`${environments.BASE_URL}/auth/register`,user );
  }

  logout(token: string): Observable<any> {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<any>(`${environments.BASE_URL}/auth/logout`, {}, httpOptions);
  }

  getListEmployer(): Observable<any[]> {
    return this.http.get<any[]>(`${environments.BASE_URL}/user/list/employer`);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put<any[]>(`${environments.BASE_URL}/user/update`, userData);
  }
}