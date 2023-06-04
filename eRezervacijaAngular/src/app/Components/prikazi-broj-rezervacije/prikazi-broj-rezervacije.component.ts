import { Component,Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; 
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ClipboardModule} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-prikazi-broj-rezervacije',
  templateUrl: './prikazi-broj-rezervacije.component.html',
  styleUrls: ['./prikazi-broj-rezervacije.component.css']
})
export class PrikaziBrojRezervacijeComponent {
  brojRezervacije=this.data.brojRezervacije;
  tooltipText="Copy to clipboard!";
  showTooltip=false;
  
  constructor(public dialogRef: MatDialogRef<PrikaziBrojRezervacijeComponent>,@Inject(MAT_DIALOG_DATA) public data: { brojRezervacije: number }){}

  showCopyTooltip(){
    this.showTooltip=true;
  }

  hideCopyTooltip(){
    this.showTooltip=false;
  }

  leaveAMessage(){
    this.showTooltip=true;
    this.tooltipText="Copied!";
  }
}
