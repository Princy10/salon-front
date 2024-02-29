import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: "root",
})
export class StatService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }

  getStatReservation(): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/stat/reservation`, {
      headers: this.getHeaders(),
    });
  }

  getStatChiffreAffaire(): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/stat/chiffre-affaire`, {
      headers: this.getHeaders(),
    });
  }

  getStatBenefice(): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/stat/benefice`, {
      headers: this.getHeaders(),
    });
  }

  getStatMoyenTravail(): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/stat/temps-travail`, {
      headers: this.getHeaders(),
    });
  }
}
