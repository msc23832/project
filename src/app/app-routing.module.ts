import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SassComponent } from './sass/sass.component';
import { CollapsibleComponent } from './collapsible/collapsible.component';
import { MobileComponent } from './mobile/mobile.component';
import { LoginComponent } from './login/login.component';
import { SupportComponent } from './support/support.component';
import { CompanyComponent } from './company/company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { IssueComponent } from './issue/issue.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { HomeComponent } from './home/home.component';
import { LoginGuardService } from './login-guard.service';
import { IssueattachComponent } from './issueattach/issueattach.component';

const routes: Routes = [

  { path: '', component: SassComponent,
    children: [{
      path: '',
      component: HomeComponent
    }, {
      path: 'home',
      component: HomeComponent
    }, {
        path: 'login', component: LoginComponent
    }]
  },

  { path: 'support', component: SupportComponent, canActivate: [LoginGuardService],
    children: [{
      path: '',
      component: CompanyListComponent
    }, {
      path: 'company',
      component: CompanyComponent
    }, {
      path: 'company/:id',
      component: CompanyComponent
    }, {
      path: 'companylist',
      component: CompanyListComponent
    }, {
      path: 'customer',
      component: CustomerComponent
    }, {
      path: 'customerlist',
      component: CustomerListComponent
    }, {
      path: 'user',
      component: UserComponent
    }, {
      path: 'user/:id',
      component: UserComponent
    }, {
      path: 'userlist',
      component: UserListComponent
    }, {
      path: 'issue',
      component: IssueComponent
    }, {
      path: 'issue/:id',
      component: IssueComponent
    }, {
      path: 'issuelist',
      component: IssueListComponent
    }, {
      path: 'issueattach/:id',
      component: IssueattachComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
