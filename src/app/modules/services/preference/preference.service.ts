import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private http: HttpClient) { }

  getPreferenceEmplById(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/preference_employer/liste/${id}`);
  }

  getPreferenceServiceById(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/preference_service/list/${id}`);
  }

  getPreferenceById(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/preference_employer/list/${id}`);
  }

}
