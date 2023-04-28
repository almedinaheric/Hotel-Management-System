export class Soba{
  naziv:string;
  opis:string;
  hotel:object;
  hotelID:number;
  sobaDetalji:object;
  sobaDetaljiID:number;
  kapacitet:number;
  brojKreveta:number;
  brojKrevetaZaJednuOsobu:number;
  brojKrevetaNaSprat:number;
  brojBracnihKreveta:number;
  mogucnostDodavanjaDjecijegKreveta:boolean;
  ukupnaCijena:number;
}

export class SobaDetalji{
  tv:boolean;
  wiFi:boolean;
  kuhinja:boolean;
  dozvoljenoPusenje:boolean;
  kucniLjubimci:boolean;
  prilagodjenoZaDjecu:boolean;
  fen:boolean;
  pegla:boolean;
  dodatniJastuci:boolean;
  mikrovalna:boolean;
  kafeAparat:boolean;
  kuhalo:boolean;
  ocistitiPrijeOdlaska:boolean;
  kupatilo:boolean;
  klima:boolean;
  grijanje:boolean;
  balkon:boolean;
}

