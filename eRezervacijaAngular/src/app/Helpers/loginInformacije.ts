export class LoginInformacije {
  autentifikacijaToken: AutentifikacijaToken;
  isLogiran: boolean=false;
}

export interface AutentifikacijaToken{
  id: number;
  vrijednost: string;
  gost: object;
  admin: object;
  vlasnik: object;
  korisnik:object;
  korisnikID: number;
  ipAdresa: string;
}
export interface Korisnik {
  id: number;
  uloga: string;
  ime: string;
  prezime: string;
  spol: string;
  datum_rodjenja: Date;
  email: string;
  broj_telefona: string;
  username: string;
  datumKreiranja: Date;
  datumPromjene: Date;
}
export class Gost {
  id: number;
  korisnik: Korisnik;
  korisnikID: number;
  kreditnaKarticaID: string;
}
