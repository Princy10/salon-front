import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotification(): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/notification/liste`);
  }

  getNotifById(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/notification/list/${id}`);
  }
}
