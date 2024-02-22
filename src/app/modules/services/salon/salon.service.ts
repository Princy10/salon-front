import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: "root",
})
export class SalonService {
  constructor(private http: HttpClient) {}

  getServices(): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/services/list`, {
      headers: this.getHeaders(),
    });
  }

  getServiceById(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/services/list/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createService(serviceData: any): Observable<any> {
    return this.http.post(`${environments.BASE_URL}/services/create`, serviceData, {
      headers: this.getHeaders(),
    });
  }

  updateService(id: string, serviceData: any): Observable<any> {
    return this.http.put(`${environments.BASE_URL}/services/update/${id}`, serviceData, {
      headers: this.getHeaders(),
    });
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${environments.BASE_URL}/services/delete/${id}`, {
      headers: this.getHeaders(),
    });
  }

  uploadImage(imageData: FormData): Observable<any> {
    return this.http.post<any>(`${environments.BASE_URL}/services/upload-image`, imageData, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }

}
