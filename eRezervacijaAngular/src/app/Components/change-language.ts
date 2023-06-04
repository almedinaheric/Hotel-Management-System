import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  template: `
    <div>
      <button
        *ngFor="let language of languagesList; index as i"
        (click)="changeLanguage(language.code)"
      >
        <img [src]="language.imgUrl" [alt]="language.name" />
        <span> {{ language.shorthand }} </span>
      </button>
    </div>
  `,
})
export class LanguageSelectorComponent {
  constructor(private translocoService: TranslocoService) {}
  public languagesList:
    Array<Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>> = [
    {
      imgUrl: '/assets/images/Deutsch.png',
      code: 'bs',
      name: 'Bosnian',
      shorthand: 'BS',
    },
    {
      imgUrl: '/assets/images/English.png',
      code: 'en',
      name: 'English',
      shorthand: 'ENG',
    },
    {
      imgUrl: '/assets/images/Persian.png',
      code: 'tr',
      name: 'Turkish',
      shorthand: 'TR',
    },
  ];
  public changeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
    languageCode === 'fa'
      ? (document.body.style.direction = 'rtl')
      : (document.body.style.direction = 'ltr');
  }
}
