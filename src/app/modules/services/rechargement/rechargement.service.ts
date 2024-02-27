import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RechargementService {

  constructor(private http: HttpClient) { }

  insererDepot(depotData: any): Observable<any> {
    return this.http.post<any>(`${environments.BASE_URL}/depot/create`, depotData);
  }

  portefeuille_ByIndividue(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/portefeuille/list/${id}`);
  }

}
