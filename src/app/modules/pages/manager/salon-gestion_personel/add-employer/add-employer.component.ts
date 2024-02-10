import { Component } from '@angular/core';
import { GestionPersonelService } from 'src/app/modules/services/gestion_personel/gestion-personel.service';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.css']
})
export class AddEmployerComponent {
  Employer: any = {};

  constructor(private gestionPersonelService: GestionPersonelService) {}

  ajout_employer() {
    this.gestionPersonelService.createEmployer(this.Employer).subscribe(
      (response) => {
        console.log('Utilisateur enregistré avec succès : ', response);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur : ', error);
      }
    );
  }

}
