import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OffreSpecialeService {

  constructor(private http: HttpClient) { }

  createOffreSpeciale(offre: any): Observable<any> {
    return this.http.post(`${environments.BASE_URL}/offre_speciale/create`, offre , {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }
}
