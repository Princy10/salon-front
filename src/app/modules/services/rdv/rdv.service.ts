import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http: HttpClient) { }

  insererRdvEtServices(rdvData: any): Observable<any> {
    return this.http.post<any>(`${environments.BASE_URL}/prise_rdv/create`, rdvData);
  }
}