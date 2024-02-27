import { Component } from '@angular/core';
import { RechargementService } from 'src/app/modules/services/rechargement/rechargement.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-rechargement',
  templateUrl: './rechargement.component.html',
  styleUrls: ['./rechargement.component.css']
})
export class RechargementComponent {
  user: any = [];
  montant: string = '';
  portefeuille_individu: any = {
    "_id": "",
    "id_individu": "",
    "solde": ""
  };
  constructor(
   private rechargementService: RechargementService,
   private router: Router
  ) {}

  ngOnInit(): void {
   this.PorteFeuilleClientById();
  }

  PorteFeuilleClientById() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
      this.rechargementService.portefeuille_ByIndividue(this.user.individu._id).subscribe((res) => {
      this.portefeuille_individu = res as any;
    })
  }
  }

  rechargement(): void {
    const currentUserString = localStorage.getItem("currentUser");

    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const userId = currentUser;

      const dateDepot = new Date();
      const montant = this.montant;


      const depotData = {
        id_individu: userId.individu._id,
        date_depot: dateDepot,
        montant: montant,
      };

      this.rechargementService.insererDepot(depotData).subscribe(
        (response) => {
          console.log('depot succée');
          this.router.navigate(['/rdv']);
        },
        (error) => {
          console.error('depot erreur', error);
        }
      );
    }
  }

}
