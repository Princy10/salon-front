import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class JournalCaisseService {

  constructor(private http: HttpClient) { }

  createDepense(depenseData: any): Observable<any> {
    return this.http.post(`${environments.BASE_URL}/journalCaisse/create`, depenseData, {
      headers: this.getHeaders(),
    });
  }

  paiementSalaire(paiementData: any): Observable<any> {
    return this.http.post(`${environments.BASE_URL}/journalCaisse/createPaiement`, paiementData, {
      headers: this.getHeaders(),
    });
  }

  getJournalCaisse(): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/journalCaisse/list`, {
      headers: this.getHeaders(),
    });
  }

  BeneficePerte(dateDebut: string, dateFin: string): Observable<any> {
    const body = { dateDebut, dateFin }; 
    return this.http.post(`${environments.BASE_URL}/journalCaisse/calcul_Benef_Perte`, body, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`).set('Content-Type', 'application/json');
  }
}
