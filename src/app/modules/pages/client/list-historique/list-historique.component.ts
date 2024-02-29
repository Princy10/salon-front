import { Component } from '@angular/core';
import { RdvService } from 'src/app/modules/services/rdv/rdv.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-historique',
  templateUrl: './list-historique.component.html',
  styleUrls: ['./list-historique.component.css']
})
export class ListHistoriqueComponent {
  user: any = [];
  rdvByidClient: any = [];
  rdvByid: any = {
    _id: "",
    id_individu_client: { nom: "", prenom: "" },
    id_individu_empl: { nom: "", prenom: "" },
    date_heure: "",
    etat: "",
    services: [{ titre: "", prix: "" }]
  };

  showAlert: boolean = false;
  showSuccessAlert: boolean = false;

  constructor(
    private rdvService: RdvService, 
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.getClientById();
  }

  getClientById() {
    this.spinner.show('spinR');
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
      this.rdvService.getRdvClientById(this.user.individu._id).subscribe((res) => {
        this.rdvByidClient = res as any;
        this.spinner.hide('spinR');
      })
    }
  }

  getRdvById(id_rdv: string) {
    this.spinner.show('spinM');
    this.rdvService.getRdvById(id_rdv).subscribe((res) => {
      this.rdvByid = res as any;
    })
    this.spinner.hide('spinM');
  }

  updateEtatRdvAnnuler(id: string) {
    this.rdvService.updateEtatRdvAnnuler(id).subscribe(
      (res) => {
        console.log("Rendez-vous mis à jour avec succès :", res);

        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du rendez-vous :", error);

        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 10000);
      }
    );
  }

  insererTraitement(id: string): void {
    this.rdvService.inserertraitement(id)
      .subscribe(
        (traitementEnregistre) => {
          console.log('Traitement inséré avec succès');
          const traitementId = traitementEnregistre.traitementEnregistre._id;
          this.router.navigate(['/paiement-detail', traitementId, { idRdv: id }]);

          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        },
        error => {
          console.error('Erreur lors de l\'insertion du traitement :', error);
          
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 10000);
        }
      );
  }

}