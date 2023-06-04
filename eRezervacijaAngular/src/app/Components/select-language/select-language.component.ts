import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css']
})
export class SelectLanguageComponent {
  selectedLanguage: any;
  showDropdown: boolean = false;
  @Input() side:any;

  languages = [
    { name: 'Bosnian', code: 'bs', flag: 'assets/img/bosnia-and-herzegovina.png' },
    { name: 'English', code: 'en', flag: 'assets/img/united-kingdom.png' },
    { name: 'Turkish', code: 'tr', flag: 'assets/img/turkey.png' }
  ];

  constructor(private translocoService: TranslocoService) {
  }
  
  ngOnInit() {
    const activeLang = this.translocoService.getActiveLang();
    this.selectedLanguage = this.languages.find(language => language.code === activeLang);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  public changeLanguage(language:any): void {
    this.translocoService.setActiveLang(language.code);
    this.selectedLanguage = language;
    this.showDropdown = false;
  }

}
