import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GestionPersonelService {

  constructor(private http: HttpClient) { }

  createEmployer(employer: any): Observable<any> {
    return this.http.post(`${environments.BASE_URL}/gestion_employe/ajout_empl`, employer , {
      headers: this.getHeaders(),
    });
  }

  getEmployer(): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/gestion_employe/list`, {
      headers: this.getHeaders(),
    });
  }

  deleteEmployer(id: string): Observable<any> {
    return this.http.delete(`${environments.BASE_URL}/gestion_employe/delete/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getEmployerById(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/gestion_employe/list/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateEmployer(id: string, EmployerData: any): Observable<any> {
    return this.http.put(`${environments.BASE_URL}/gestion_employe/update/${id}`, EmployerData, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }
}
