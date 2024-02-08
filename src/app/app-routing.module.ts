import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/templ/layout/layout.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { ServiceSalonComponent } from './modules/pages/service-salon/service-salon.component';
import { ServiceListeComponent } from './modules/pages/service-liste/service-liste.component';
import { AuthGuard } from './modules/guard/auth.guard';

const routes: Routes = [
  // without layout
  { 
    path: 'login',
    component: LoginComponent,
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
        path: 'service',
        component: ServiceSalonComponent,
      },
      {
        path: 'liste_service',
        component: ServiceListeComponent,
      },
    ],
  },
  // pour les routes inconnues
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }