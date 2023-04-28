import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MojConfig } from 'src/app/MojConfig';

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css']
})
export class SearchResultsPageComponent {
  response:any;
  hotelsSearched:any;
  zvjezdice:any[]=[];
  udaljenosti:any[]=[];
  ocjene:any[]=[];
  searchTerm:any;
  numGuests:any;
  numRooms:any;
  dateStart:any;
  dateEnd:any;

  constructor(private router: Router,private route: ActivatedRoute,private httpKlijent:HttpClient) {
    this.searchTerm=sessionStorage.getItem('gradPretraga');
    this.numGuests=sessionStorage.getItem('numGuests');
    this.numRooms=sessionStorage.getItem('numRooms');
    this.dateStart=JSON.parse(sessionStorage.getItem('dateRange')||"").dateStart;
    this.dateEnd=JSON.parse(sessionStorage.getItem('dateRange')||"").dateEnd;
  }

  zvjezdiceCheckBoxes = [
    { label: '5', control: new FormControl(false) },
    { label: '4', control: new FormControl(false) },
    { label: '3', control: new FormControl(false) },
    { label: '2', control: new FormControl(false) },
    { label: '1', control: new FormControl(false) },
  ];

  zvjezdiceForm = new FormGroup({
    5: this.zvjezdiceCheckBoxes[0].control,
    4: this.zvjezdiceCheckBoxes[1].control,
    3: this.zvjezdiceCheckBoxes[2].control,
    2: this.zvjezdiceCheckBoxes[3].control,
    1: this.zvjezdiceCheckBoxes[4].control
  });

  udaljenostCheckBoxes = [
    { label: 'Manje od 1 km', control: new FormControl(false) },
    { label: 'Manje od 3 km', control: new FormControl(false) },
    { label: 'Manje od 5 km', control: new FormControl(false) }
  ];

  udaljenostForm = new FormGroup({
    1: this.udaljenostCheckBoxes[0].control,
    3: this.udaljenostCheckBoxes[1].control,
    5: this.udaljenostCheckBoxes[2].control
  });

  ocjenaCheckBoxes = [
    { label: '4 i više', control: new FormControl(false) },
    { label: '3 i više', control: new FormControl(false) },
    { label: '2 i više', control: new FormControl(false) },
    { label: '1 i više', control: new FormControl(false) },
  ];

  ocjenaForm = new FormGroup({
    4: this.ocjenaCheckBoxes[0].control,
    3: this.ocjenaCheckBoxes[1].control,
    2: this.ocjenaCheckBoxes[2].control,
    1: this.ocjenaCheckBoxes[3].control,
  });

  saveToSessionStorage() {
    const checkboxValue1:any = {};
    this.zvjezdiceCheckBoxes.forEach((checkBox) => {
      checkboxValue1[checkBox.label] = checkBox.control.value;
    });
    sessionStorage.setItem('zvjezdice', JSON.stringify(checkboxValue1));

    const checkboxValue2:any = {};
    this.udaljenostCheckBoxes.forEach((checkBox) => {
      checkboxValue2[checkBox.label] = checkBox.control.value;
    });
    sessionStorage.setItem('udaljenost', JSON.stringify(checkboxValue2));

    const checkboxValue3:any = {};
    this.ocjenaCheckBoxes.forEach((checkBox) => {
      checkboxValue3[checkBox.label] = checkBox.control.value;
    });
    sessionStorage.setItem('ocjena', JSON.stringify(checkboxValue3));
  }

  provjeriStejt(){
    this.zvjezdice.splice(0,this.zvjezdice.length);
    this.udaljenosti.splice(0,this.udaljenosti.length);
    this.ocjene.splice(0,this.ocjene.length);

    //spremi sve brojeve koji su true u array
    for (const zvjezdica in this.zvjezdiceForm.controls) {
      if (this.zvjezdiceForm.controls.hasOwnProperty(zvjezdica)) {
        //@ts-ignore
        const control = this.zvjezdiceForm.controls[zvjezdica];
        if (control.value) {
          this.zvjezdice.push(parseInt(zvjezdica));
        }
      }
    }

    for (const udaljenost in this.udaljenostForm.controls) {
      if (this.udaljenostForm.controls.hasOwnProperty(udaljenost)) {
        //@ts-ignore
        const control = this.udaljenostForm.controls[udaljenost];
        if (control.value) {
          this.udaljenosti.push(parseInt(udaljenost));
        }
      }
    }

    for (const ocjena in this.ocjenaForm.controls) {
      if (this.ocjenaForm.controls.hasOwnProperty(ocjena)) {
        //@ts-ignore
        const control = this.ocjenaForm.controls[ocjena];
        if (control.value) {
          this.ocjene.push(parseInt(ocjena));
        }
      }
    }
    console.log(this.zvjezdice);
    console.log(this.udaljenosti);
    console.log(this.ocjene);
  }

  ngOnInit(){
    this.response=JSON.parse(sessionStorage.getItem("search-results")||"");
    this.hotelsSearched=this.response.dataItems;
    console.log(this.hotelsSearched);
    this.loadCheckboxesState();
  }

  NaLandingPage()
  {
    sessionStorage.clear();
    this.router.navigate(['landingPage']);
  }

  loadCheckboxesState() {
    //@ts-ignore
    const checkboxValue1 = JSON.parse(sessionStorage.getItem('zvjezdice'));
    if (checkboxValue1) {
      this.zvjezdiceCheckBoxes.forEach((checkBox) => {
        const state = checkboxValue1[checkBox.label];
        checkBox.control.setValue(state);
      });
    }

    //@ts-ignore
    const checkboxValue2 = JSON.parse(sessionStorage.getItem('udaljenost'));
    if (checkboxValue2) {
      this.udaljenostCheckBoxes.forEach((checkBox) => {
        const state = checkboxValue2[checkBox.label];
        checkBox.control.setValue(state);
      });
    }

    //@ts-ignore
    const checkboxValue3 = JSON.parse(sessionStorage.getItem('ocjena'));
    if (checkboxValue3) {
      this.ocjenaCheckBoxes.forEach((checkBox) => {
        const state = checkboxValue3[checkBox.label];
        checkBox.control.setValue(state);
      });
    }
  }

  Filtriraj() {
    this.saveToSessionStorage();
    this.provjeriStejt();

    let urlParams: any = {
      grad: this.searchTerm,
      datumCheckIn: '2023-4-13',
      datumCheckOut: '2023-4-13',
      brojGostiju: this.numGuests,
      brojSoba: this.numRooms,
      pageNumber: 1,
      pageSize: 10,
    };

    if (this.zvjezdice.length > 0) {
      urlParams['zvjezdice'] = this.zvjezdice;
    }

    if (this.udaljenosti.length > 0) {
      urlParams['udaljenost'] = this.udaljenosti;
    }

    if (this.ocjene.length > 0) {
      urlParams['ocjena'] = this.ocjene;
    }

    let params = new URLSearchParams();
    for (const [key, value] of Object.entries(urlParams)) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        //@ts-ignore
        params.set(key, value);
      }
    }
    let url = `/api/Hotel/Search?${params.toString()}`;

    this.httpKlijent.get(MojConfig.adresa_servera + url).subscribe((response: any) => {
      sessionStorage.setItem('search-results', JSON.stringify(response));
      location.reload();
    });
  }

  ResetFilter(){
    sessionStorage.removeItem('zvjezdice');
    sessionStorage.removeItem('ocjena');
    sessionStorage.removeItem('udaljenost');

    let urlParams:any = {
      grad: this.searchTerm,
      datumCheckIn: '2023-4-13',
      datumCheckOut: '2023-4-13',
      brojGostiju: this.numGuests,
      brojSoba: this.numRooms,
      pageNumber: 1,
      pageSize: 10
    };

    let url = `/api/Hotel/Search?${new URLSearchParams(urlParams).toString()}`;

    this.httpKlijent.get(MojConfig.adresa_servera + url).subscribe((response: any) => {
      sessionStorage.setItem('search-results', JSON.stringify(response));
      console.log(response);
      location.reload();
    });
  }
  PaginationChanged(s:any){
  console.log(s);
    let urlParams:any = {
      grad: this.searchTerm,
      datumCheckIn: this.dateStart,
      datumCheckOut: this.dateEnd,
      brojGostiju: this.numGuests,
      brojSoba: this.numRooms,
      pageNumber: s.pageIndex+1,
      pageSize: s.pageSize
    };

    let url = `/api/Hotel/Search?${new URLSearchParams(urlParams).toString()}`;
    this.httpKlijent.get(MojConfig.adresa_servera+url).subscribe((response:any)=>{
      this.hotelsSearched=response.dataItems;
    })
  }
}
