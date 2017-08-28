import { NgModule, Component, Inject, enableProdMode, OnInit } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.css']
})
export class CollapsibleComponent implements OnInit {

  private collapse;

  constructor(private _http: Http) {
    this.collapse = {
      FirstName: '',
      LastName: '',
      Address: '',
      Password: '',
      Email: ''
    };
   }

  save() {
    console.log(this.collapse);
  }

  ngOnInit() {
  }

}
