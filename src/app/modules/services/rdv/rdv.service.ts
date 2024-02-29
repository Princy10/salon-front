import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http: HttpClient) { }

  insererRdvEtServices(rdvData: any): Observable<any> {
    return this.http.post<any>(`${environments.BASE_URL}/prise_rdv/create`, rdvData);
  }

  getRdvEmployerById(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/prise_rdv/list/${id}`);
  }

  getRdvById(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/prise_rdv/listRdvById/${id}`);
  }

  updateEtatRdvValider(id: string): Observable<any> {
    return this.http.put<any>(`${environments.BASE_URL}/prise_rdv/update_valider/${id}`, {});
  }

  updateEtatRdvRefuser(id: string): Observable<any> {
    return this.http.put<any>(`${environments.BASE_URL}/prise_rdv/update_refuser/${id}`, {});
  }

  //client
  getRdvClientById(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/prise_rdv/listRdv_client/${id}`);
  }

  updateEtatRdvAnnuler(id: string): Observable<any> {
    return this.http.put<any>(`${environments.BASE_URL}/prise_rdv/update_annuler/${id}`, {});
  }

  insererPreferenceRdv(rdvData: any): Observable<any> {
    return this.http.post<any>(`${environments.BASE_URL}/prise_rdv/createPreference`, rdvData);
  }

  //paiement
  inserertraitement(id: string): Observable<any> {
    return this.http.post<any>(`${environments.BASE_URL}/traitement/create/${id}`, {});
  }

  //suivi tache
  getRdvByIdEmplAndEtat(id: string): Observable<any> {
    return this.http.get(`${environments.BASE_URL}/prise_rdv/listByEtat/${id}`);
  }

  getCommissionJournee(Data: any): Observable<any> {
    return this.http.post<any>(`${environments.BASE_URL}/traitement/commission-journee`, Data);
  }

  updatePreferences(idClient: string, idEmployeur: string, id_service: string): Observable<any> {
    return this.http.put<any>(`${environments.BASE_URL}/prise_rdv/update_preference/${idClient}/${idEmployeur}/${id_service}`, {});
  }
}