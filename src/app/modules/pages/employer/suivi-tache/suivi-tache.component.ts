import { Component } from '@angular/core';
import { RdvService } from 'src/app/modules/services/rdv/rdv.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-suivi-tache',
  templateUrl: './suivi-tache.component.html',
  styleUrls: ['./suivi-tache.component.css']
})
export class SuiviTacheComponent {
  user: any = [];
  rdvByidEmployer: any = [];
  commissionTotal: string = "";
  date: string = "";
  rechercheEnCours: boolean = false;

  constructor(private rdvService: RdvService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getEmployerById_And_Etat();
  }

  getEmployerById_And_Etat() {
    this.spinner.show('spinR');
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
      this.rdvService.getRdvByIdEmplAndEtat(this.user.individu._id).subscribe((res) => {
      this.rdvByidEmployer = res as any;
      this.spinner.hide('spinR');
    })
  }
  }

  calculerCommissionJournee() {
    this.rechercheEnCours = true;
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
      const commission = {
        date: this.date,
        idEmploye: this.user.individu._id
      }

    this.rdvService.getCommissionJournee(commission).subscribe(
      (response: any) => {
        this.commissionTotal = response.commissionTotal;
      },
      (error) => {
        console.error('Erreur lors du calcul de la commission : ', error);
      }
    );
  }
  }

}
