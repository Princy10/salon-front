import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GestionProfilService {

  constructor(private http: HttpClient) { }

  getProfilById(id: any): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/gestion_profil/list/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateProfil(id: string, EmployerData: any): Observable<any> {
    return this.http.put(`${environments.BASE_URL}/gestion_profil/update/${id}`, EmployerData, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }
}
