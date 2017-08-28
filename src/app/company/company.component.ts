import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {

  private Comp;
  private companyData;
  private mode: string = "ADD";
  private id: string;
  //private sub: any;

  constructor(private router: Router, private activate: ActivatedRoute, private CompanyService: CompanyService) {
    this.Comp = {
      code: '',
      name: ''
    };
    this.companyData = {
      code: '',
      name: ''
    };
  }

  onSubmit() {
    //console.log(this.Comp);
    let company: Array<any> = [];
    if (localStorage.getItem('company')) {
      company = JSON.parse(localStorage.getItem('company'));
    }

    if (this.mode === "EDIT") {
      //company[this.id] = this.Comp;
      //Materialize.toast('Update Success', 4000);
      //this.router.navigate(['support', 'companylist']);
      //console.log(this.id);
      //console.log(this.Comp);
      delete this.Comp._id;
      this.CompanyService.updateData(this.id, this.Comp).subscribe(
        data => {
          
          Materialize.toast('Update Success', 4000);
          this.router.navigate(['support', 'companylist']);
        },
        err => {
          console.log(err);
        });
    } else {
      //console.log(this.Comp);
      this.CompanyService.addData(this.Comp).subscribe(
        data => {
          Materialize.toast('Insert Success', 4000);
          this.router.navigate(['support', 'companylist']);
        },
        err => {
          console.log(err);
        });
      //company.push(this.Comp);

    }

    localStorage.setItem('company', JSON.stringify(company));

  }

  ngOnInit() {
    this.activate.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id']; // (+) converts string 'id' to a number
        //console.log(this.id);
        this.mode = "EDIT";
        this.loadData(this.id);
      }
    });

    //this.sub = this.activate.params.subscribe(params => {
    //   this.id = +params['id']; // (+) converts string 'id' to a number
    //});
    //this.activate.params.subscribe(params => {
    //  if (params['id']) {
    //    let id = params['id'];
    //    this.companyData = JSON.parse(localStorage.getItem('company'));
    //    this.Comp = this.companyData[id];
    //    console.log(this.Comp);
    //    Materialize.updateTextFields();
    //    this.mode = "EDIT";
    //    this.id = id;
    //  }
    //});
  }

  loadData(id){
    this.CompanyService.getItem(id).subscribe(
          company => {
            this.Comp = company;
          },
          err => {
            console.log(err);
          });
  }

}
