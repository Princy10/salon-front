import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HoraireTravailService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }

  ajoutHoraireTravail(data: any): Observable<any> {
    return this.http.post(`${environments.BASE_URL}/gestion_employe/ajout-horaire`, data, {
      headers: this.getHeaders(),
    });
  }

  getHoraireTravailByID(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/gestion_employe/getHoraire/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateHoraireTravail(id: string, data: any): Observable<any> {
    return this.http.put(`${environments.BASE_URL}/gestion_employe/updateHoraire/${id}`, data, {
      headers: this.getHeaders(),
    });
  }
}
