import { Component, OnInit } from '@angular/core';
import  {  Router  }  from  '@angular/router';
import { CompanyService } from '../company.service';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  providers: [CompanyService]
})
export class CompanyListComponent implements OnInit {

  private Comp;
  private Name;
  private searchBox;
  private paging;

  constructor(private  router: Router, private CompanyService: CompanyService) {
    this.Comp = [{
      comp_code: '',
      comp_name: ''
    }];
    this.searchBox = {
      name : '',
      rowPerPage : 10,
      numPage : 0,
      total : 0
    };
    this.paging = [];
  }

  onAddClick() {
    this.router.navigate(['support', 'company']);
  }

  onEditClick(id) {
    this.router.navigate(['support', 'company', id]);
    //localStorage.setItem('company', JSON.stringify(this.Comp));
    //localStorage.removeItem();
  }

  onDeleteClick(id) {
    this.CompanyService.deleteData(id).subscribe(
        data => {
          Materialize.toast('Delete Success', 4000);
          this.loadData();
          //this.router.navigate(['support', 'companylist']);
        },
        err => {
          console.log(err);
    });
    //this.Comp.splice(id, 1);
    //localStorage.setItem('company', JSON.stringify(this.Comp));
    //localStorage.removeItem();
  }

  search(){
    this.CompanyService.searchItem(this.searchBox).subscribe(data => {
      this.Comp = data.rows;
      this.searchBox.total = data.total;
      this.renderPageData();
    } , err => {
      console.log(err);
    });
  }

  ngOnInit() {
    //this.loadData();
    this.search();
    //if(localStorage.getItem('company')){
    //  this.Comp = JSON.parse(localStorage.getItem('company'));
    //}
  }

  loadData(){
    this.CompanyService.loadItem().subscribe(
      data  =>  {
        this.Comp  =  data;
      },
      err  =>  {
        console.log(err);
      });

  }

  renderPageData(){
    let allPage = Math.ceil(this.searchBox.total / this.searchBox.rowPerPage);
    this.paging = [];
    let i = 0;
    while(i < allPage){
      this.paging.push(i+1);
      i++;
    }
  }

  gotoPage(pId){
    this.searchBox.numPage = pId;
    this.search();
  }


  

}
