import { Component, OnInit } from '@angular/core';
import { HoraireTravailService } from 'src/app/modules/services/horaire-travail/horaire-travail.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-horaire-travail',
  templateUrl: './horaire-travail.component.html',
  styleUrls: ['./horaire-travail.component.css']
})
export class HoraireTravailComponent implements OnInit{
  heureDebut: string = "";
  heureFin: string = "";

  horaireTravail: any = null;

  showAlert: boolean = false;
  showSuccessAlert: boolean = false;

  constructor(private horaireTravailService: HoraireTravailService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getHoraireEmpl()
  }

  getHoraireEmpl() {
    this.spinner.show('spin');
    const currentUserData = localStorage.getItem('currentUser');

    if (!currentUserData) {
      console.error('Données de l\'utilisateur actuel introuvables dans le localStorage');
      return;
    }

    const currentUser = JSON.parse(currentUserData);
    const currentUserID = currentUser.individu._id;

    this.horaireTravailService.getHoraireTravailByID(currentUserID).subscribe(
      (response) => {
        console.log('Horaire de travail récupéré avec succès', response);
        this.horaireTravail = response.horaireTravail;
        this.spinner.hide('spin');
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'horaire de travail', error);
        this.spinner.hide('spin');
      }
    );
  }

  ajouterHoraireTravail() {
    this.spinner.show('spin');
    const currentUserData = localStorage.getItem('currentUser');

    if (!currentUserData) {
      console.error('Données de l\'utilisateur actuel introuvables dans le localStorage');
      return;
    }
    const currentUser = JSON.parse(currentUserData);
    const currentUserID = currentUser.individu._id;

    const data = {
      individu: currentUserID,
      heure_debut: this.heureDebut,
      heure_fin: this.heureFin
    };

    this.horaireTravailService.ajoutHoraireTravail(data).subscribe(
      (response) => {
        console.log('Horaire de travail ajouté avec succès', response);
        this.spinner.hide('spin');
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'horaire de travail', error);
        this.spinner.hide('spin');
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 10000);
      }
    );
  }

  updateHoraireTravail() {
    this.spinner.show('spin');
    const currentUserData = localStorage.getItem('currentUser');

    if (!currentUserData) {
      console.error('Données de l\'utilisateur actuel introuvables dans le localStorage');
      return;
    }

    const currentUser = JSON.parse(currentUserData);
    const currentUserID = currentUser.individu._id;

    const data = {
      heure_debut: this.heureDebut,
      heure_fin: this.heureFin
    };

    this.horaireTravailService.updateHoraireTravail(currentUserID, data).subscribe(
      (response) => {
        console.log('Horaire de travail mis à jour avec succès', response);
        this.getHoraireEmpl();
        this.spinner.hide('spin');
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'horaire de travail', error);
        this.spinner.hide('spin');
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 10000);
      }
    );
  }
}