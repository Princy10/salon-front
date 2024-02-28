import { Component } from '@angular/core';
import { PaiementService } from 'src/app/modules/services/paiement/paiement.service';
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-paiement-detail',
  templateUrl: './paiement-detail.component.html',
  styleUrls: ['./paiement-detail.component.css']
})
export class PaiementDetailComponent {
idRdv: any;
messageErreur: string = '';
messageSucces: string = '';
paiement: any = {
  "_id": "",
    "id_individu_client": {
        "_id": "",
        "nom": "",
        "prenom": ""
    },
    "id_individu_empl": {
        "_id": "",
        "nom": "",
        "prenom": ""
    },
    "date_heure": "",
    "services": [
        {
            "_id": "",
            "titre": "",
            "prix": "",
            "durer": "15",
            "commission": ""
        }
    ],
    "totalPrix": ""
};
  constructor(
    private paiementService: PaiementService,
    private router: ActivatedRoute,
    private routers: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const id = params.get('id');
      this.idRdv = params.get('idRdv');
      if (id) {
        this.getPaiementById(id,this.idRdv);
      }
    });
  }

  getPaiementById(id_traitement: string,id_rdv: string) {
    this.spinner.show('spin');
    this.paiementService.getPaiementById(id_traitement,id_rdv).subscribe((res) => {
      this.paiement = res as any;
      console.log( this.paiement);
      this.spinner.hide('spin');
    })
  }

  effectuerPaiement(id: string, montant: number): void {
    this.spinner.show('spin');
    this.paiementService.payer(id,this.idRdv,montant)
      .subscribe(
        () => {
          console.log('Paiement effectué avec succès');
          this.messageSucces = 'Paiement effectué avec succès';

          this.spinner.hide('spin');
        },
        error => {
          this.messageErreur = error.error.message;
          console.error('Erreur lors du paiement :', error);
          this.spinner.hide('spin');
        }
      );
  }

}
