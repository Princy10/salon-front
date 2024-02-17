import { Component } from '@angular/core';
import { RdvService } from 'src/app/modules/services/rdv/rdv.service';

@Component({
  selector: 'app-rdv-emplyer',
  templateUrl: './rdv-emplyer.component.html',
  styleUrls: ['./rdv-emplyer.component.css']
})
export class RdvEmplyerComponent {
  user: any = [];
  rdvByidEmployer: any = [];
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
    this.getEmployerById();
  }

  getEmployerById() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
      this.rdvService.getRdvEmployerById(this.user.individu._id).subscribe((res) => {
      this.rdvByidEmployer = res as any;
    })
  }
  }

  getRdvById(id_rdv: string) {
    this.rdvService.getRdvById(id_rdv).subscribe((res) => {
      this.rdvByid = res as any;
    })
  }

  updateEtatRdvValider(id: string) {
    this.rdvService.updateEtatRdvValider(id).subscribe(
      (res) => {
        console.log("Rendez-vous mis à jour avec succès :", res);
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du rendez-vous :", error);
      }
    );
  }

  updateEtatRdvRefuser(id: string) {
    this.rdvService.updateEtatRdvRefuser(id).subscribe(
      (res) => {
        console.log("Rendez-vous mis à jour avec succès :", res);
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du rendez-vous :", error);
      }
    );
  }

}
