import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private Price;
  private Eng;
  private Date;
  private Title;

  constructor() {
    this.Price = 12345678;
    this.Eng = 'Have a Nice Day';
    this.Date = new Date();
    this.Title = 'Log In'; 
  }

  ngOnInit() {
  }

}
