import { Component } from '@angular/core';
import { JournalCaisseService } from 'src/app/modules/services/journal_caisse/journal-caisse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-depense',
  templateUrl: './add-depense.component.html',
  styleUrls: ['./add-depense.component.css']
})
export class AddDepenseComponent {
  montant: string = '';
  libeler: string= '';

  constructor(
   private journalCaisseService: JournalCaisseService,
   private router: Router
  ) {}

  ngOnInit(): void {
  }

  addDepense(): void {
    const currentUserString = localStorage.getItem("currentUser");

    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const userId = currentUser;

      const montant = this.montant;
      const libeller = this.libeler;


      const depenseData = {
        id_individu: userId.individu._id,
        type_mouvement: 'Débit',
        date_heure: new Date(),
        montant: montant,
        libeller_journal: libeller,
      };

      this.journalCaisseService.createDepense(depenseData).subscribe(
        (response) => {
          console.log('depense ajouter avec succes ');
          this.router.navigate(['/list-journal']);
        },
        (error) => {
          console.error('depense erreur', error);
        }
      );
      }
  }

}
