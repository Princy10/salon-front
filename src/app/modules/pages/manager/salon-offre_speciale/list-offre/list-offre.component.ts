import { Component } from '@angular/core';
import { OffreSpecialeService } from 'src/app/modules/services/offre_speciale/offre-speciale.service';

@Component({
  selector: 'app-list-offre',
  templateUrl: './list-offre.component.html',
  styleUrls: ['./list-offre.component.css']
})
export class ListOffreComponent {

  offre: any[] = []
  offreById: any = {
    "_id": "",
        "id_service": {
            "_id": "",
            "titre": "",
            "prix": "",
            "durer": "",
            "commission": ""
        },
        "date_debut": "",
        "date_fin": "",
        "prix": "",
        "titre": "",
        "description": "",
  }

  constructor(private offreServicce: OffreSpecialeService, ) { }

  ngOnInit(): void {
    this.getOffre();
  }


  getOffre(): void {
    this.offreServicce.getOffre().subscribe(
      (data) => {
        this.offre = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getOffreById(id_offre: string) {
    this.offreServicce.getOffreById(id_offre).subscribe((res) => {
      this.offreById = res as any;
      // console.log("service by id =>"+this.serviceById._id);
    })
  }

  updateOffreById(id_offre: string) {
    // console.log("ao am update =>"+id_service);
    this.offreServicce.updateOffre(id_offre, this.offreById).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du service :", error);
      }
    );
  }  

  deleteOffreById(id_offre: string) {
    this.offreServicce.deleteOffre(id_offre).subscribe(
      (res) => {
         console.log("Service supprimé avec succès :", res);
      },
      (error) => {
        console.error("Erreur lors de la suppression du service :", error);
      }
    );
  }  


}
