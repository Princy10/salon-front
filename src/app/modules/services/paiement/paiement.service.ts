import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private http: HttpClient) { }

  getPaiementById(id: string,id_rdv: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/traitement/list/${id}/${id_rdv}`);
  }

  payer(id: string, id_rdv: string, montant: number): Observable<any> {
    const body = { id, id_rdv, montant };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${environments.BASE_URL}/traitement/payer`, body, { headers });
  }
}
