import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  CurrntMonth: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  date:Date= new Date();
  dd = String(this.date.getDate())
  mm = this.CurrntMonth[this.date.getMonth()]
  yy = String(this.date.getFullYear()-100)
  title = '100YearsAgo';
}
