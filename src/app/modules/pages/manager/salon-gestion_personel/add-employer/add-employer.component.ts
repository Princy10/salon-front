import { Component, OnInit } from '@angular/core';
import { GestionPersonelService } from 'src/app/modules/services/gestion_personel/gestion-personel.service';
import { Router } from '@angular/router';
import { io, Socket} from 'socket.io-client';
import { environments } from 'src/environments/environments';

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

  ngOnInit(): void {
    this.Employer.code_fonction = "EMP";
    this.Employer.role = "employer";
    this.Employer.heure_travail = "0";

    this.socket = io(environments.BASE_URL);
    this.socket.on('ajout_employe', () => {});
  }

  constructor(private gestionPersonelService: GestionPersonelService,private router: Router) {}

  ajout_employer() {
    this.gestionPersonelService.createEmployer(this.Employer).subscribe(
      (response) => {
        this.socket.emit('ajout_employe');
        console.log('Utilisateur enregistré avec succès : ', response);
        this.router.navigate(['/list-employer']);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur : ', error);
      }
    );
  }

}
