import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/pages/templ/layout/layout.component';
import { LoginComponent } from './modules/pages/auth/login/login.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { AuthGuard } from './modules/guard/auth.guard';
import { RegisterComponent } from './modules/pages/auth/register/register.component';
import { ListServiceComponent } from './modules/pages/manager/salon-service/list-service/list-service.component';
import { AddServiceComponent } from './modules/pages/manager/salon-service/add-service/add-service.component';

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
        path: 'list-service',
        component: ListServiceComponent,
      },
      {
        path: 'add-service',
        component: AddServiceComponent,
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