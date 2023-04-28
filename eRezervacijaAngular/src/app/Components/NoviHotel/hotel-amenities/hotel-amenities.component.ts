import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-hotel-amenities',
  templateUrl: './hotel-amenities.component.html',
  styleUrls: ['./hotel-amenities.component.css']
})
export class HotelAmenitiesComponent {
  checkBoxes = [
    { label: 'Konferencijska sala', control: new FormControl(false) },
    { label: 'Bazen', control: new FormControl(false) },
    { label: 'SPA', control: new FormControl(false) },
    { label: 'Sauna', control: new FormControl(false) },
    { label: 'Teretana', control: new FormControl(false) },
    { label: 'Restoran', control: new FormControl(false) },
    { label: 'Kafic', control: new FormControl(false) },
  ];

  myForm = new FormGroup({
    konferencijskaSala: this.checkBoxes[0].control,
    bazen: this.checkBoxes[1].control,
    spa: this.checkBoxes[2].control,
    sauna: this.checkBoxes[3].control,
    teretana: this.checkBoxes[4].control,
    restoran: this.checkBoxes[5].control,
    kafic: this.checkBoxes[6].control,
  });

  ngOnInit(){
    this.loadCheckboxesState();
  }

  allCheckboxes = new FormControl(false);

  toggleAllCheckboxes() {
    const isChecked = this.allCheckboxes.value;
    this.checkBoxes.forEach((checkBox) => {
      checkBox.control.setValue(isChecked);
    });
    this.saveToSessionStorage();
  }

  saveToSessionStorage() {
    const checkboxValue:any = {};
    this.checkBoxes.forEach((checkBox) => {
      //value[key]=value
      checkboxValue[checkBox.label] = checkBox.control.value;
    });
    sessionStorage.setItem('hotelAmenities', JSON.stringify(checkboxValue));
  }

  loadCheckboxesState() {
    //@ts-ignore
    const checkboxValue = JSON.parse(sessionStorage.getItem('hotelAmenities'));
    if (checkboxValue) {
      this.checkBoxes.forEach((checkBox) => {
        const state = checkboxValue[checkBox.label];
        checkBox.control.setValue(state);
      });
    }
  }
}
