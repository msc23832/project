import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  providers: [IssueService]
})
export class IssueListComponent implements OnInit {

  constructor(
    private router: Router,
    private issueService: IssueService) { }

  issueData = [];

  ngOnInit() {


    //this.search();

    this.issueService.loadItem().subscribe(
      datas => {
        this.issueData = datas;
      },
      err => {
        console.log(err);
      });
  }

  onAddButtonClick() {
    this.router.navigate(['support', 'issue']);
  }

  onEditButtonClick(id){
    this.router.navigate(['support','issue', id]);
  }


  onDeleteButtonClick(id){
    this.issueService.deleteItem(id).subscribe(
      datas => {
        this.issueData.splice(id,1);
        localStorage.setItem("issue",JSON.stringify(this.issueData));
        Materialize.toast('Deleye item complete',1000);
      },
      err => {
        console.log(err);
      } );
      this.loadItem()
  }


  loadItem() {
    this.issueService.loadItem().subscribe(
      datas => {
        this.issueData = datas;
      },
      err => {
        console.log(err);
      });
  }

}
