import { Component } from '@angular/core';
import { GestionPersonelService } from 'src/app/modules/services/gestion_personel/gestion-personel.service';
import { io, Socket} from 'socket.io-client';

@Component({
  selector: 'app-liste-employer',
  templateUrl: './liste-employer.component.html',
  styleUrls: ['./liste-employer.component.css']
})
export class ListeEmployerComponent {
  emploi: any[] = [];
  employerById: any = {
    "id_individu": "",
    "code_fonction": "",
    "salaire": "",
    "date_debut": "",
    "date_fin": "",
    "heure_travail": ""
  }
  socket!: Socket;

  currentPage = 1;
  itemsPerPage = 5;
  filterString = "";

  constructor(private gestionPersonelService: GestionPersonelService) { }

  ngOnInit(): void {
    this.getEmployer();
    this.socket = io('http://localhost:3000');
    this.socket.on('updateEmployer', () => {
      this.getEmployer();
    });

    this.socket.on('deleteEmployer', () => {
      this.getEmployer();
    });
  }

  getEmployer(): void {
    this.gestionPersonelService.getEmployer().subscribe(
      (data) => {
        this.emploi = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getFilteredEmployees(): any[] {
    return this.emploi.filter((emploi) =>
      emploi.id_individu.nom.toLowerCase().includes(this.filterString.toLowerCase()) ||
      emploi.id_individu.prenom.toString().toLowerCase().includes(this.filterString.toLowerCase())
    );
  }

  getPaginatedEmployees(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.getFilteredEmployees().slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  deleteEmployerById(id_employer: string) {
    this.gestionPersonelService.deleteEmployer(id_employer).subscribe(
      (res) => {
        // console.log("Service supprimé avec succès :", res);
        this.socket.emit('deleteEmployer');
        this.emploi = this.emploi.filter(empl => empl._id !== id_employer);
      },
      (error) => {
        console.error("Erreur lors de la suppression du service :", error);
      }
    );
  }  

  getEmployerById(id_employer: string) {
    this.gestionPersonelService.getEmployerById(id_employer).subscribe((res) => {
      this.employerById = res as any;
      // console.log("service by id =>"+this.serviceById._id);
    })
  }

  updateEmployerById(id_employer: string) {
    // console.log("ao am update =>"+id_service);
    this.gestionPersonelService.updateEmployer(id_employer, this.employerById).subscribe(
      () => {
        this.socket.emit('updateEmployer');
        this.emploi.forEach((emploi, i) => {
          if (emploi._id === id_employer) {
            this.emploi[i] = this.employerById;
          }
        });
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du service :", error);
      }
    );
  }  
}