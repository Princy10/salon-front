import { Component } from '@angular/core';
import { GestionPersonelService } from 'src/app/modules/services/gestion_personel/gestion-personel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.css']
})
export class AddEmployerComponent {
  Employer: any = {};

  constructor(private gestionPersonelService: GestionPersonelService,private router: Router) {}

  ajout_employer() {
    this.gestionPersonelService.createEmployer(this.Employer).subscribe(
      (response) => {
        console.log('Utilisateur enregistré avec succès : ', response);
        this.router.navigate(['/list-employer']);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur : ', error);
      }
    );
  }

}
