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
        path: 'notification-detail/:id',
        component: NotificationComponent,
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