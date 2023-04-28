import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes, RouterLinkActive} from "@angular/router";
import {LoginGostComponent} from "./Components/login/login-gost-page/login-gost.component";
import {LoginVlasnikComponent} from "./Components/login/login-vlasnik-page/login-vlasnik.component";
import {LoginAdminComponent} from "./Components/login/login-admin-page/login-admin.component";
import {RegisterGostComponent} from "./Components/register/register-gost-page/register-gost.component";
import {RegisterVlasnikComponent} from "./Components/register/register-vlasnik-page/register-vlasnik.component";
import {LandingPageComponent} from "./Components/landing-page/landing-page.component";
import {ProfileComponent} from "./Components/profile-page/profile.component";
import {NotFoundComponent} from "./Components/not-found-page/not-found.component";
import {MojeRezervacijeComponent} from "./Components/moje-rezervacije/moje-rezervacije.component";
import {OpeningPageComponent} from "./Components/opening-page/opening-page.component";
import {MojeRecenzijeComponent} from "./Components/moje-recenzije/moje-recenzije.component";
import {MojiObjektiComponent} from "./Components/moji-objekti/moji-objekti.component";
import {PoveziKreditnuKarticuComponent} from "./Components/povezi-kreditnu-karticu/povezi-kreditnu-karticu.component";
import {ZahtjeviComponent} from "./Components/zahtjevi/zahtjevi.component";
import {PromijeniLozinkuComponent} from "./Components/promijeni-lozinku/promijeni-lozinku.component";
import {RegisterAdminComponent} from "./Components/register/register-admin-page/register-admin.component";
import { MojProfilComponent } from './Components/moj-profil/moj-profil.component';
import { DodajHotelComponent } from './Components/NoviHotel/dodaj-hotel/dodaj-hotel.component';
import { PopisSobaComponent } from './Components/NoviHotel/popis-soba/popis-soba.component';
import { DodajSobuComponent } from './Components/NoviHotel/dodaj-sobu/dodaj-sobu.component';
import { DodajSlikeComponent } from './Components/NoviHotel/dodaj-slike/dodaj-slike.component';
import { DodaneSobeComponent } from './Components/NoviHotel/dodane-sobe/dodane-sobe.component';
import { FormsModule } from '@angular/forms';
import { AddHotelComponent } from './Components/NoviHotel/add-hotel/add-hotel.component';
import { AddSobaComponent } from './Components/NoviHotel/add-soba/add-soba.component';
import { SelectBoxComponent } from './Components/select-box/select-box.component';
import { VisokoocjenjeniHoteliComponent } from './Components/visokoocjenjeni-hoteli/visokoocjenjeni-hoteli.component';
import {SearchResultsPageComponent} from "./Components/search-results-page/search-results-page.component";
import { FooterComponent } from './Components/footer/footer.component';
import { UrediHotelComponent } from './Components/uredi-hotel/uredi-hotel.component';
import {SupportComponent} from "./Components/support/support.component";
import { OdabraniHotelComponent } from './Components/odabrani-hotel/odabrani-hotel.component';
import { RecenzijaCardComponent } from './Components/recenzija-card/recenzija-card.component';
import {ListaPitanjaAdminComponent} from "./Components/lista-pitanja-admin/lista-pitanja-admin.component";


const routes: Routes = [
  {path: '', component: OpeningPageComponent},
  {path: 'loginGost', component: LoginGostComponent},
  {path: 'loginVlasnik', component: LoginVlasnikComponent},
  {path: 'loginAdmin', component: LoginAdminComponent},
  {path: 'registerGost', component: RegisterGostComponent},
  {path: 'registerVlasnik', component: RegisterVlasnikComponent},
  {path: 'registerAdmin', component: RegisterAdminComponent},
  {path: 'landingPage', component: LandingPageComponent},
  {
    path: 'dashboard', component: ProfileComponent, children: [
      {path: 'mojiObjekti', component: MojiObjektiComponent},
      {path: 'mojeRezervacije', component: MojeRezervacijeComponent},
      {path: 'mojeRecenzije', component: MojeRecenzijeComponent},
      {path: 'kreditnaKartica', component: PoveziKreditnuKarticuComponent},
      {path: 'zahtjevi', component: ZahtjeviComponent},
      {path: 'promijeniLozinku', component: PromijeniLozinkuComponent},
      {path: 'mojProfil', component: MojProfilComponent},
      {path: 'support', component: SupportComponent},
      {path: 'pitanjaAdmin', component: ListaPitanjaAdminComponent},
      {path: 'pitanjaGost', component: SupportComponent},
      {path: '', redirectTo: 'mojProfil', pathMatch: 'full'}
    ]
  },
  {path: 'pregledHotela', component: UrediHotelComponent},
  {
    path: 'dodajHotel', component: DodajHotelComponent,children: [
      { path: 'addHotel/:currentIndex', component: AddHotelComponent },
      {path: 'addSoba', component: AddSobaComponent},
      {path: 'popisSoba', component: PopisSobaComponent},
      {path: 'dodajSobu', component: DodajSobuComponent},
      {path: 'dodajSlike', component: DodajSlikeComponent},
      {path: 'dodaneSobe', component: DodaneSobeComponent},
    ],
  },
  {path: 'searchResults', component:SearchResultsPageComponent},
  {path: 'odabraniHotel/:id', component:OdabraniHotelComponent},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    RouterLinkActive,
    FormsModule
  ]
})
export class AppRoutingModule {
}
