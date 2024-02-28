import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/pages/templ/layout/layout.component';
import { LoginComponent } from './modules/pages/auth/login/login.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { AuthGuard } from './modules/guard/auth.guard';
import { RegisterComponent } from './modules/pages/auth/register/register.component';
import { ListServiceComponent } from './modules/pages/manager/salon-service/list-service/list-service.component';
import { AddServiceComponent } from './modules/pages/manager/salon-service/add-service/add-service.component';
import { AddEmployerComponent } from './modules/pages/manager/salon-gestion_personel/add-employer/add-employer.component';
import { ListeEmployerComponent } from './modules/pages/manager/salon-gestion_personel/liste-employer/liste-employer.component';
import { PriseRdvComponent } from './modules/pages/client/prise-rdv/prise-rdv.component';
import { ListHistoriqueComponent } from './modules/pages/client/list-historique/list-historique.component';
import { ProfileComponent } from './modules/pages/public/profile/profile.component';
import { RdvEmplyerComponent } from './modules/pages/employer/rdv-emplyer/rdv-emplyer.component';
import { AddOffreComponent } from './modules/pages/manager/salon-offre_speciale/add-offre/add-offre.component';
import { NotificationComponent } from './modules/pages/client/notification/notification.component';
import { RechargementComponent } from './modules/pages/client/rechargement/rechargement.component';
import { AddDepenseComponent } from './modules/pages/manager/salon-journal_caisse/add-depense/add-depense.component';
import { ListJournalCaisseComponent } from './modules/pages/manager/salon-journal_caisse/list-journal-caisse/list-journal-caisse.component';
import { PaiementSalaireComponent } from './modules/pages/manager/salon-paiement_salaire/paiement-salaire/paiement-salaire.component';
import { PaiementDetailComponent } from './modules/pages/client/paiement-detail/paiement-detail.component';
import { ListOffreComponent } from './modules/pages/manager/salon-offre_speciale/list-offre/list-offre.component';
import { ChiffreAffaireComponent } from './modules/pages/manager/statistique/chiffre-affaire/chiffre-affaire.component';
import { ReservationComponent } from './modules/pages/manager/statistique/reservation/reservation.component';
import { BeneficeComponent } from './modules/pages/manager/statistique/benefice/benefice.component';
import { SuiviTacheComponent } from './modules/pages/employer/suivi-tache/suivi-tache.component';
import { HistoriquePaiementComponent } from './modules/pages/employer/historique-paiement/historique-paiement.component';

const routes: Routes = [
  // without layout
  { 
    path: 'login',
    component: LoginComponent,
  },
  { 
    path: 'register',
    component: RegisterComponent,
  },
  // with layout
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'list-service',
        component: ListServiceComponent,
      },
      {
        path: 'add-service',
        component: AddServiceComponent,
      },
      {
        path: 'add-employer',
        component: AddEmployerComponent,
      },
      {
        path: 'list-employer',
        component: ListeEmployerComponent,
      },
      //client
      {
        path: 'rdv',
        component: PriseRdvComponent,
      },
      {
        path: 'list-rdv',
        component: ListHistoriqueComponent,
      },
      {
        path: 'rdv-employer',
        component: RdvEmplyerComponent,
      },
      {
        path: 'add-offre',
        component: AddOffreComponent,
      },
      {
        path: 'list-offre',
        component: ListOffreComponent,
      },
      {
        path: 'notification-detail/:id',
        component: NotificationComponent,
      },
      {
        path: 'rechargement',
        component: RechargementComponent,
      },
      {
        path: 'add-depense',
        component: AddDepenseComponent,
      },
      {
        path: 'list-journal',
        component: ListJournalCaisseComponent,
      },
      {
        path: 'paiement-salaire',
        component: PaiementSalaireComponent,
      },
      {
        path: 'paiement-detail/:id',
        component: PaiementDetailComponent,
      },
      {
        path: 'stat/reservation',
        component: ReservationComponent,
      },
      {
        path: 'stat/chiffre-affaire',
        component: ChiffreAffaireComponent,
      },
      {
        path: 'stat/benefice',
        component: BeneficeComponent,
      },
      {
        path: 'suivi-tache',
        component: SuiviTacheComponent,
      },
      {
        path: 'historique-paiement',
        component: HistoriquePaiementComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }