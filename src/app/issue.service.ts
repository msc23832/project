import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class IssueService {

  options: RequestOptions;

  constructor(private http: Http) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token')
    });
    this.options = new RequestOptions({ headers: headers });
  }

  loadItem(): Observable<any[]> { // environment.apiUrl + '/company'  สามารถเขียนแบบนี้แทนได้ เป็นการต่อ string
    return this.http.get(`${environment.apiUrl}/issue` , this.options) //set urlไว้ที environment.ts 
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  findById(id): Observable<any> {

    return this.http.get(
      `${environment.apiUrl}/issue/findById/${id}` , this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  updateItem(body, id): Observable<any> {
    delete body._id;
    let bodyString = JSON.stringify(body);
    return this.http.put(
      `${environment.apiUrl}/issue/${id}`, bodyString , this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  addItem(body): Observable<any> {
    let bodyString = JSON.stringify(body);
    return this.http.post(
      `${environment.apiUrl}/issue`, bodyString, this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));

  }

  deleteItem(id): Observable<any> {

    return this.http.delete(
      `${environment.apiUrl}/issue/${id}` , this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }


  search(body): Observable<any> {
    let bodyString = JSON.stringify(body);
    return this.http.post(
      `${environment.apiUrl}/issue/search`, bodyString, this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));

  }


}
