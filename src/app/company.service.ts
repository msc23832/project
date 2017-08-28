import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';


@Injectable()
export class CompanyService {

  options: RequestOptions;

  constructor(private http : Http) { 
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token')
    });
    this.options = new RequestOptions({ headers: headers });
  }

  loadItem(): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/company`)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  getItem(id): Observable<any[]> {
    let bodyString = JSON.stringify(id);
    return this.http.get(`${environment.apiUrl}/company/findByID/${id}` , this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  searchItem(body): Observable<any> {
    let bodyString = JSON.stringify(body);
    return this.http.post(`${environment.apiUrl}/company/search`, bodyString , this.options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  addData(body): Observable<any[]> {
    let bodyString = JSON.stringify(body); // Stringify payload
    return this.http.post(`${environment.apiUrl}/company`, bodyString, this.options) // ...using post request
      .map((res: Response) => { 
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  updateData(id, body): Observable<any[]> {
    let bodyString = JSON.stringify(id); // Stringify payload
    return this.http.put(`${environment.apiUrl}/company/${id}`, bodyString, this.options) // ...using post request
      .map((res: Response) => { 
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  deleteData(body): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/company/${body}`) // ...using post request
      .map((res: Response) => { 
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }


}
