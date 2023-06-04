import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../MojConfig";
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.css']
})
export class RezervacijaComponent {
  currentIndex:any=0;

  constructor(private route: ActivatedRoute,private router:Router,private httpklijent: HttpClient){ }

  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.currentIndex = +params["currentIndex"];
    });
  }
}
