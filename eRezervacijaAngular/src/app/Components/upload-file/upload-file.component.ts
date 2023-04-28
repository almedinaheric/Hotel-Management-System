import { Component,Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  @Input() namjena:string;
  @Input() labelButtona:string='Dodajte sliku';
  @Input() viseSlika:boolean=false;
  @Input() input:any;
  imageUrl: any;
  imageUrls: any[] = [];

  ngOnInit(){
    this.loadImage();
  }

  removeImg(index:number){
    if (index >= 0 && index < this.imageUrls.length){
      this.imageUrls.splice(index, 1);
      sessionStorage.setItem('imageUrls', JSON.stringify(this.imageUrls));
    }
  }
  
  loadImage() {
    if (this.viseSlika) {
      //ucitavanje vise slika
      const imageUrlsString = sessionStorage.getItem('imageUrls');
      if (imageUrlsString) {
        this.imageUrls = JSON.parse(imageUrlsString);
      }
    } else {
      //ucitavnje jedne slike
      const img = sessionStorage.getItem('jednaSlika');
      if (img) {
        this.imageUrl = 'data:image/jpeg;base64,' + img;
        this.labelButtona='Promijenite sliku';
      }
    }
  }
  
  dodajSliku(event: any) {
    const files = event.target.files;
  
    if (this.viseSlika==true) {
      // Upload vise slika
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrls.push(e.target.result.split(',')[1]);
          sessionStorage.setItem('imageUrls', JSON.stringify(this.imageUrls));
        };
        reader.readAsDataURL(files[i]);
      }
    } 
    else {
      // Upload jedne slike
      const file = files.item(0);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        sessionStorage.setItem('jednaSlika', e.target.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
      this.labelButtona='Promijenite sliku';
    }
  }
  
}
