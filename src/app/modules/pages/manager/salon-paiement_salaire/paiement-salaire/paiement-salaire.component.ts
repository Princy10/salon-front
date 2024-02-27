import { Component } from '@angular/core';
import { JournalCaisseService } from 'src/app/modules/services/journal_caisse/journal-caisse.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/services/user/user.service';

@Component({
  selector: 'app-paiement-salaire',
  templateUrl: './paiement-salaire.component.html',
  styleUrls: ['./paiement-salaire.component.css']
})
export class PaiementSalaireComponent {

  montant: string = '';
  employer: string= '';
  listEmployer: any[] = [];
  
  constructor(
   private journalCaisseService: JournalCaisseService,
   private userService: UserService,
   private router: Router
  ) {}

  ngOnInit(): void {
    this.getListEmployer();
  }

  getListEmployer(): void {
    this.userService.getListEmployer().subscribe(
      (data) => {
        this.listEmployer = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  PaiementSalaire(): void {

      const montant = this.montant;
      const id_employer = this.employer;


      const depenseData = {
        id_individu: id_employer,
        type_mouvement: 'Débit',
        date_heure: new Date(),
        montant: montant,
        libeller_journal: 'paiment salaire employer',
      };

      this.journalCaisseService.paiementSalaire(depenseData).subscribe(
        (response) => {
          console.log('salaire payer avec succes ');
          this.router.navigate(['/list-journal']);
        },
        (error) => {
          console.error('salaire erreur', error);
        }
      );
    
  }

}
