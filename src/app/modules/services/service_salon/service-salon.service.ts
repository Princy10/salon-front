import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Services } from 'src/app/modules/models/services';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})

export class ServiceSalonService {

  constructor(private http: HttpClient) { }

  add_service(titre: string, prix: Number, durer: Number, commission: Number): Observable<Services> {
    const token = localStorage.getItem('token'); // Récupérez le token depuis le service d'authentification
    if (!token) {
      throw new Error('Token non trouvé'); // Gérer le cas où le token n'est pas trouvé
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Services>(`${environments.BASE_URL}/services/create_service`, { titre, prix, durer, commission }, { headers });
  }

  list_service(): Observable<Services[]> {
    const token = localStorage.getItem('token'); // Récupérez le token depuis le service d'authentification
    if (!token) {
      throw new Error('Token non trouvé'); // Gérer le cas où le token n'est pas trouvé
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Services[]>(`${environments.BASE_URL}/services/list_service`, { headers });
  }

  delete_service(_id: string): Observable<Services> {
    const token = localStorage.getItem('token'); // Récupérez le token depuis le service d'authentification
    if (!token) {
      throw new Error('Token non trouvé'); // Gérer le cas où le token n'est pas trouvé
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<Services>(`${environments.BASE_URL}/services/delete_service/${_id}`, { headers });
  }

}
