import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './modules/pages/auth/login/login.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { LayoutComponent } from './modules/pages/templ/layout/layout.component';
import { SidebarComponent } from './modules/pages/templ/sidebar/sidebar.component';
import { RegisterComponent } from './modules/pages/auth/register/register.component';
import { AddServiceComponent } from './modules/pages/manager/salon-service/add-service/add-service.component';
import { ListServiceComponent } from './modules/pages/manager/salon-service/list-service/list-service.component';
import { AddEmployerComponent } from './modules/pages/manager/salon-gestion_personel/add-employer/add-employer.component';
import { ListeEmployerComponent } from './modules/pages/manager/salon-gestion_personel/liste-employer/liste-employer.component';
import { GestionProfilComponent } from './modules/pages/employer/gestion_profil/gestion-profil/gestion-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LayoutComponent,
    SidebarComponent,
    AddServiceComponent,
    ListServiceComponent,
    AddEmployerComponent,
    ListeEmployerComponent,
    GestionProfilComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
