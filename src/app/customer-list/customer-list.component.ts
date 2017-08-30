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

  customerData = [];
  searchText = "";
  numPage = 0;
  rowPerPage = 2;
  total = 0;

  ngOnInit() {
    this.search();
  }

  loadItem() {
    this.CustomerService.loadItem().subscribe(
      datas => {
        this.customerData = datas;
      },
      err => {
        console.log(err);
      });
  }

  onAddButtonClick() {
    this.router.navigate(['support', 'customer']);
  }

  onDeleteButtonClick(id) {
    this.CustomerService.deleteItem(id).subscribe(
      datas => {
        this.loadItem();
      },
      err => {
        console.log(err);
      });
  }

  onEditButtonClick(id) {
    this.router.navigate(['support', 'customer', id]);
  }

  search() {
    let searchBody = {
      searchText: this.searchText,
      rowPerPage: this.rowPerPage,
      numPage: this.numPage
    }
    this.CustomerService.search(searchBody).subscribe(data => {
      this.customerData = data.rows;
      this.total = data.total;
      this.renderPaging();
    }, error => {
      console.log(error);
    });
  }

  renderPaging() {
    let allPage = Math.ceil(this.total / this.rowPerPage);
    this.paging = [];
    for (let i = 0; i < allPage; i++) {
      this.paging.push(i + 1);
    }
  }

  gotoPage(pId) {
    this.numPage = pId;
    this.search();
  }

}
