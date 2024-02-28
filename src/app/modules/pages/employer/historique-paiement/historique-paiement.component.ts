import { Component } from '@angular/core';
import { JournalCaisseService } from 'src/app/modules/services/journal_caisse/journal-caisse.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-historique-paiement',
  templateUrl: './historique-paiement.component.html',
  styleUrls: ['./historique-paiement.component.css']
})
export class HistoriquePaiementComponent {
  user: any = [];
  historique: any = [];

  constructor(private journalCaisseService: JournalCaisseService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
      this.historiquePaiement(this.user.individu._id) 
    }
  }

  historiquePaiement(id_service: string) {
    this.spinner.show('spinR');
    this.journalCaisseService.getJournalById_individu(id_service).subscribe(
      (response: any) => {
       console.log(response);
       this.historique = response;
       this.spinner.hide('spinR');
      },
      (error) => {
        console.error('Erreur lors du calcul de la commission : ', error);
        this.spinner.hide('spinR');
      }
    );
  
  }

}
