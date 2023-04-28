import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatNativeDateModule} from "@angular/material/core";
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardHeader } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './Components/not-found-page/not-found.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { ProfileComponent } from './Components/profile-page/profile.component';
import { RouterModule } from "@angular/router";
import { LoginAdminComponent } from './Components/login/login-admin-page/login-admin.component';
import { LoginVlasnikComponent } from './Components/login/login-vlasnik-page/login-vlasnik.component';
import { LoginGostComponent } from './Components/login/login-gost-page/login-gost.component';
import { RegisterAdminComponent } from './Components/register/register-admin-page/register-admin.component';
import { RegisterGostComponent } from './Components/register/register-gost-page/register-gost.component';
import { RegisterVlasnikComponent } from './Components/register/register-vlasnik-page/register-vlasnik.component';
import { InputFieldComponent } from './Components/input-field/input-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordFieldComponent } from './Components/password-field/password-field.component';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import { MojeRezervacijeComponent } from './Components/moje-rezervacije/moje-rezervacije.component';
import { OpeningPageComponent } from './Components/opening-page/opening-page.component';
import { LoginOpeningPageComponent } from './Components/login-opening-page/login-opening-page.component';
import { LoginFormComponent } from './Components/login/login-form/login-form.component';
import { PoveziKreditnuKarticuComponent } from './Components/povezi-kreditnu-karticu/povezi-kreditnu-karticu.component';
import { MojeRecenzijeComponent } from "./Components/moje-recenzije/moje-recenzije.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RegisterFormComponent } from './Components/register/register-form/register-form.component';
import { ChooseDateComponent } from './Components/choose-date/choose-date.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { PretragaFormaComponent } from './Components/pretraga-forma/pretraga-forma.component';
import { PopularniGradoviComponent } from './Components/popularni-gradovi/popularni-gradovi.component';
import { MojProfilComponent } from './Components/moj-profil/moj-profil.component';
import { DodajHotelComponent } from './Components/NoviHotel/dodaj-hotel/dodaj-hotel.component';
import { TextareaComponent } from './Components/textarea/textarea.component';
import { UploadFileComponent } from './Components/upload-file/upload-file.component';
import { DodajSobuComponent } from './Components/NoviHotel/dodaj-sobu/dodaj-sobu.component';
import { PopisSobaComponent } from './Components/NoviHotel/popis-soba/popis-soba.component';
import { DodajSlikeComponent } from './Components/NoviHotel/dodaj-slike/dodaj-slike.component';
import { DodaneSobeComponent } from './Components/NoviHotel/dodane-sobe/dodane-sobe.component';
import { MojiObjektiComponent } from './Components/moji-objekti/moji-objekti.component';
import { AddHotelComponent } from './Components/NoviHotel/add-hotel/add-hotel.component';
import { OpsteInformacijeComponent } from './Components/NoviHotel/opste-informacije/opste-informacije.component';
import { HotelDetaljiComponent } from './Components/NoviHotel/hotel-detalji/hotel-detalji.component';
import { HotelAmenitiesComponent } from './Components/NoviHotel/hotel-amenities/hotel-amenities.component';
import { RoomAmenitiesComponent } from './Components/NoviHotel/room-amenities/room-amenities.component';
import { AddSobaComponent } from './Components/NoviHotel/add-soba/add-soba.component';
import {MatTableModule} from "@angular/material/table";
import { SelectBoxComponent } from './Components/select-box/select-box.component';
import { PopisHotelaComponent } from './Components/NoviHotel/popis-hotela/popis-hotela.component';
import {PromijeniLozinkuComponent} from "./Components/promijeni-lozinku/promijeni-lozinku.component";
import { VisokoocjenjeniHoteliComponent } from './Components/visokoocjenjeni-hoteli/visokoocjenjeni-hoteli.component';
import { SearchResultsPageComponent } from './Components/search-results-page/search-results-page.component';
import { HotelCardComponent } from './Components/hotel-card/hotel-card.component';
import { FooterComponent } from './Components/footer/footer.component';
import { UrediHotelComponent } from './Components/uredi-hotel/uredi-hotel.component';
import { SupportComponent } from './Components/support/support.component';
import { MojaPitanjaComponent } from './Components/moja-pitanja/moja-pitanja.component';
import { ListaPitanjaAdminComponent } from './Components/lista-pitanja-admin/lista-pitanja-admin.component';
import { OdabraniHotelComponent } from './Components/odabrani-hotel/odabrani-hotel.component';
import { RecenzijaCardComponent } from './Components/recenzija-card/recenzija-card.component';
import { ZahtjeviComponent} from "./Components/zahtjevi/zahtjevi.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DatePipe} from "@angular/common";
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './Components/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LandingPageComponent,
    ProfileComponent,
    LoginAdminComponent,
    LoginVlasnikComponent,
    LoginGostComponent,
    RegisterAdminComponent,
    RegisterGostComponent,
    RegisterVlasnikComponent,
    InputFieldComponent,
    PasswordFieldComponent,
    SideNavComponent,
    MojeRezervacijeComponent,
    OpeningPageComponent,
    LoginOpeningPageComponent,
    PasswordFieldComponent,
    LoginFormComponent,
    MojeRecenzijeComponent,
    PoveziKreditnuKarticuComponent,
    RegisterFormComponent,
    ChooseDateComponent,
    NavbarComponent,
    PretragaFormaComponent,
    PopularniGradoviComponent,
    MojProfilComponent,
    DodajHotelComponent,
    TextareaComponent,
    UploadFileComponent,
    DodajSobuComponent,
    PopisSobaComponent,
    DodajSlikeComponent,
    DodaneSobeComponent,
    MojiObjektiComponent,
    AddHotelComponent,
    OpsteInformacijeComponent,
    HotelDetaljiComponent,
    HotelAmenitiesComponent,
    RoomAmenitiesComponent,
    AddSobaComponent,
    SelectBoxComponent,
    PopisHotelaComponent,
    PromijeniLozinkuComponent,
    VisokoocjenjeniHoteliComponent,
    SearchResultsPageComponent,
    HotelCardComponent,
    FooterComponent,
    UrediHotelComponent,
    SupportComponent,
    MojaPitanjaComponent,
    ListaPitanjaAdminComponent,
    OdabraniHotelComponent,
    RecenzijaCardComponent,
    ZahtjeviComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatDividerModule,
        MatDatepickerModule,
        MatRadioModule,
        MatNativeDateModule,
        MatTooltipModule,
        HttpClientModule,
        MatCardModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule,
        MatMenuModule,
        MatToolbarModule,
        FormsModule,
        MatCheckboxModule,
        MatTableModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatPaginatorModule
    ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
