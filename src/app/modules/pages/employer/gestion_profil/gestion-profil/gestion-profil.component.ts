import { Component } from '@angular/core';
import { GestionProfilService } from 'src/app/modules/services/gestion_profil/gestion-profil.service';

@Component({
  selector: 'app-gestion-profil',
  templateUrl: './gestion-profil.component.html',
  styleUrls: ['./gestion-profil.component.css']
})
export class GestionProfilComponent {
  profils: any[] = [];
  employerById: any = { 
    "individu": {
      "_id": "",
      "nom": "",
      "prenom": "",
      "date_naissance": "",
      "contact": "",
      "adresse": "",
      "mail": "",
      "cin": ""
    },
    "user": {
      "username": "",
      "password": ""
    }
  };

  constructor(private gestionProfilService: GestionProfilService) { }

  ngOnInit(): void {
    this.getIdFromLocalStorage()
  }

  getEmployerById(id_employer: any) {
    this.gestionProfilService.getProfilById(id_employer).subscribe((res) => {
      this.employerById = res as any;
    })
  }

  getIdFromLocalStorage() {
    const individuStr = localStorage.getItem('id');
    this.getEmployerById(individuStr);
  }

  updateProfilById(id_employer: string) {
    let testvar : any = {
      "nom": this.employerById.individu.nom,
      "prenom":  this.employerById.individu.prenom,
      "date_naissance": this.employerById.individu.date_naissance,
      "contact": this.employerById.individu.contact,
      "adresse": this.employerById.individu.adresse,
      "mail": this.employerById.individu.mail,
      "cin": this.employerById.individu.mail,
      "username": this.employerById.user.username,
      "password": this.employerById.user.password,
    }
    
    this.gestionProfilService.updateProfil(id_employer, testvar).subscribe(
      () => {
        this.profils.forEach((profil, i) => {
          if (profil._id === id_employer) {
            this.profils[i] = this.employerById;
          }
        });
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du service :", error);
      }
    );
  }
}
