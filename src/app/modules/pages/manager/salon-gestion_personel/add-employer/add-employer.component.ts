import { Component, OnInit } from '@angular/core';
import { GestionPersonelService } from 'src/app/modules/services/gestion_personel/gestion-personel.service';
import { Router } from '@angular/router';
import { io, Socket} from 'socket.io-client';
import { environments } from 'src/environments/environments';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.css']
})
export class AddEmployerComponent implements OnInit {
  Employer: any = {
    nom: "",
    prenom: "",
    username: "",
    password: "",
    cin: "",
    date_naissance: "",
    contact: "",
    adresse: "",
    mail: "",
    role: "",
    code_fonction: "",
    salaire: "",
    date_debut: "",
    date_fin: "",
    heure_travail: ""
  };
  socket!: Socket;

  showAlert: boolean = false;
  showSuccessAlert: boolean = false;

  ngOnInit(): void {
    this.Employer.code_fonction = "EMP";
    this.Employer.role = "employer";
    this.Employer.heure_travail = "0";

    this.socket = io(environments.BASE_URL);
    this.socket.on('ajout_employe', () => {});
  }

  constructor(private gestionPersonelService: GestionPersonelService,private router: Router, private spinner: NgxSpinnerService) {}

  ajout_employer() {
    this.spinner.show('spinR');
    this.gestionPersonelService.createEmployer(this.Employer).subscribe(
      (response) => {
        this.socket.emit('ajout_employe');
        console.log('Utilisateur enregistré avec succès : ', response);

        this.spinner.hide('spinR');
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
        this.router.navigate(['/list-employer']);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur : ', error);
        this.spinner.hide('spinR');
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 10000);
      }
    );
  }

}
