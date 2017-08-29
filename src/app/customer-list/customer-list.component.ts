import { Component, OnInit } from '@angular/core';
import  {  Router  }  from  '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {

  private Comp;
  private Name;
  private searchBox;
  private paging;

  constructor(private  router: Router, private CustomerService: CustomerService) {
    this.Comp = [{
      code: '',
      name: ''
    }];
    this.searchBox = {
      name : '',
      rowPerPage : 5,
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
    this.CustomerService.deleteData(id).subscribe(
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
    this.CustomerService.searchItem(this.searchBox).subscribe(data => {
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
    this.CustomerService.loadItem().subscribe(
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
