import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-odaberi-jezik',
  templateUrl: './odaberi-jezik.component.html',
  styleUrls: ['./odaberi-jezik.component.css']
})
export class OdaberiJezikComponent {
  index=0;
  languages = [
    { title:'Welcome to eRezervacija', subtitle:'Choose a language', code:'en'},
    { title:'Dobrodošli u eRezervacija', subtitle:'Odaberite jezik',code:'bs'},
    { title:'eRezervacija`ya hoş geldiniz', subtitle:'Bir dil seçin',code:'tr'},
  ];

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(){
    setInterval(() => {
      this.index = (this.index + 1) % this.languages.length;
    }, 3000);
  }

  public changeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
  }
}
