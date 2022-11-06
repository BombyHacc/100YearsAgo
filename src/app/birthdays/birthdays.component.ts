import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  bornlist: String[] = [];
  finalBornList: String[] = [];
  diedlist: String[] = [];

  getBirthdays() {
    var events: String[];
    events = []


    this.service.getEvents().subscribe((response) => {

      let obj = JSON.parse(JSON.stringify(response))
      let data = obj.parse.wikitext["*"];
      let cleanText = data.replace(/<\/?[^>].+(>|$)/g, "").replace(/(\|.+?])|[\[\]]/g, "");
      events = cleanText.split("*");

      for (var el in events) {
        if (events[el].includes("Died:")) {
          if(events[el].includes("'''Died: '''") || events[el].includes("'''Died:'''")){
            events[el] = events[el].replace("'''Died: '''",'');
            events[el] = events[el].replace("'''Died:'''",'');
          }
          for (let i = parseInt(el); i < events.length; i++) {
            if(events[i]){
              this.diedlist.push(events[i])
            }
            
          }
        }
        if (events[el].includes("Born:")) {
          if(events[el].includes("'''Born: '''") || events[el].includes("'''Born:'''")){
            events[el] = events[el].replace("'''Born: '''",'');
            events[el] = events[el].replace("'''Born:'''",'');
          }
          for (let i = parseInt(el); i < events.length; i++) {
            if (events[i].includes("Died:")) {
              break;
            }
            if(events[i]){
              this.bornlist.push(events[i])
            }
          }
        }
      }
      if(!this.diedlist[0].trim()){
        console.log(this.diedlist[0].trim())
        this.diedlist.shift();
      }
      if(!this.bornlist[0].trim()){
        console.log(this.bornlist[0].trim())
        this.bornlist.shift();
      }


      console.log(this.bornlist)
      console.log(this.diedlist)
    }, (error) => {

    });
  }

  ngOnInit(): void {
    this.getBirthdays();
  }
  constructor(private service: UserService) { }

}
