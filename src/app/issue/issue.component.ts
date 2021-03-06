import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service';
import { CompanyService } from '../company.service';
import { CustomerService } from '../customer.service';
import { UploadService } from '../shared/user/upload.service';
import { environment } from '../../environments/environment';
import { UserService } from '../user.service';
import { Issue } from './issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers: [IssueService, CompanyService, CustomerService, UploadService, UserService]
})
export class IssueComponent implements OnInit {

  private filesToUpload = [];
  private issue: Issue;
  private issueData;
  private companyData;
  private customerData;
  private UserData;
  mode: string = 'ADD';
  id: number;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private issueService: IssueService, private companyService: CompanyService, private customerService: CustomerService, private uploadService: UploadService, private UserService: UserService) {
    this.issue = new Issue();
  }

  ngOnInit() {
    this.GetCustomer();
    this.GetCompany();
    this.GetUsers();
    this.activeRoute.params.subscribe(param => {
      if (param['id']) {
        let id = param['id'];
        this.issueService.findById(id).subscribe(
          issue => {
            this.issue = issue;
            //this.status = issue.status;
            //this.company = customer.company;
          },
          error => {
            console.log(error);
          });

        this.mode = "EDIT";
        this.id = id;
      }
    });
  }


  onSave() {
    let company: Array<any> = [];
    if (localStorage.getItem('issue')) {
      company = JSON.parse(localStorage.getItem('issue'));
    }
    if (this.mode == "EDIT") {
      this.issueService.updateItem(this.issue, this.id).subscribe(
        datas => {
          Materialize.toast('update item complete', 1000);
          this.router.navigate(['support', 'issueattach', this.id]);
        },
        err => {
          console.log(err);
        });

    } else {
      this.issueService.addItem(this.issue).subscribe(
        datas => {
          Materialize.toast('Add new item complete', 1000);
          this.router.navigate(['support', 'issueattach' , datas._id]);
        },
        err => {
          console.log(err);
        });
    }

  }

  GetCompany() {
    this.companyService.loadItem().subscribe(
      datas => {
        this.companyData = datas;
      },
      err => {
        console.log(err);
      });
  }

  GetCustomer() {
    this.customerService.loadItem().subscribe(
      datas => {
        this.customerData = datas;
      },
      err => {
        console.log(err);
      });
  }

  GetUsers() {
    this.UserService.loadItem().subscribe(
      datas => {
        this.UserData = datas;
      },
      err => {
        console.log(err);
      });
  }

}
