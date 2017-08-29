import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  private currentLang = 'TH';

  constructor(private tranService: TranslateService) { }

  onChangeLang() {
    this.currentLang = this.currentLang == "en"?"th":"en";
    this.tranService.use(this.currentLang);
  }

  ngOnInit() {
    $(".button-collapse").sideNav({
      edge:'left',
      closeOnClick: true,
      draggable: true
    });
  }

}
