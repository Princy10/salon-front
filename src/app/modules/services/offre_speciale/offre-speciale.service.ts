import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OffreSpecialeService {

  constructor(private http: HttpClient) { }

  getOffre(): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/offre_speciale/list`, {
      headers: this.getHeaders(),
    });
  }

  getOffreById(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/offre_speciale/list/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createOffreSpeciale(offre: any): Observable<any> {
    return this.http.post(`${environments.BASE_URL}/offre_speciale/create`, offre , {
      headers: this.getHeaders(),
    });
  }

  updateOffre(id: string, offreData: any): Observable<any> {
    return this.http.put(`${environments.BASE_URL}/offre_speciale/update/${id}`, offreData, {
      headers: this.getHeaders(),
    });
  }

  deleteOffre(id: string): Observable<any> {
    return this.http.delete(`${environments.BASE_URL}/offre_speciale/delete/${id}`, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }
}
