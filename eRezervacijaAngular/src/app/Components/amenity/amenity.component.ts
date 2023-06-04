import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-amenity',
  templateUrl: './amenity.component.html',
  styleUrls: ['./amenity.component.css']
})
export class AmenityComponent {
  @Input() amenity:any;
  ngOnInit(){
  }
}
