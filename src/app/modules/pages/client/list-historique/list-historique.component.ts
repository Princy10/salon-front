import { Component } from '@angular/core';
import { RdvService } from 'src/app/modules/services/rdv/rdv.service';

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

  constructor(private rdvService: RdvService) { }

  ngOnInit(): void {
    this.getClientById();
  }

  getClientById() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
      this.rdvService.getRdvClientById(this.user.individu._id).subscribe((res) => {
      this.rdvByidClient = res as any;
    })
  }
  }

  getRdvById(id_rdv: string) {
    this.rdvService.getRdvById(id_rdv).subscribe((res) => {
      this.rdvByid = res as any;
    })
  }

  updateEtatRdvAnnuler(id: string) {
    this.rdvService.updateEtatRdvAnnuler(id).subscribe(
      (res) => {
        console.log("Rendez-vous mis à jour avec succès :", res);
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du rendez-vous :", error);
      }
    );
  }
}
