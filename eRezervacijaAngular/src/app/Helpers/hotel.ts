export class Hotel{
  naziv:string;
  opis:string;
  adresa:string;
  vlasnikID:number;
  hotelDetaljiID:number;
  emailHotela:string;
  brojTelefona:string;
  slika?:string;
  gradID:number;
  ukupanBrojSoba:number;
  brojJednokrevetnihSoba:number;
  brojDvokrevetnihSoba:number;
  brojTrokrevetnihSoba:number;
  brojSpratova:number;
  vrijemeCheckIna:string;
  vrijemeCheckOuta:string;
  unlisted:boolean;
  brojZvjezdica:boolean;
  udaljenostOdCentraGrada:number;
  prosjecnaOcjena:number;
}

export class HotelDetalji{
  konferencijskaSala:boolean;
  bazen:boolean;
  spa:boolean;
  sauna:boolean;
  teretana:boolean;
  restoran:boolean;
  kafic:boolean;
}
