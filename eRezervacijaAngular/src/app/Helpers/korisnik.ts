export class Korisnik{
  id:number;
  uloga:string;
  ime:string;
  prezime:string;
  spol:string;
  datum_rodjenja:string;
  email:string;
  broj_telefona:string;
  username:string;
  datumKreiranja:string;
  datumPromjene:string;
}

export class Vlasnik{
  id:number;
  korisnikID:number;
  brojBankovnogRacuna:string;
  brojLicneKarte:string;
}
