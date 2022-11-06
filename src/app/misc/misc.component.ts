import { Component, OnInit } from '@angular/core';
import * as fs from 'fs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.css']
})
export class MiscComponent implements OnInit {
  factsArray: String[] = [];

  CurrntMonth: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  date:Date= new Date();
  mm = this.CurrntMonth[this.date.getMonth()]

  showFacts(){
    this.service.getFacts().subscribe(data =>{
      this.factsArray = data.split("*")
    });
  }
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.showFacts()
  }

}
