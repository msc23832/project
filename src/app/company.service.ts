import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';


@Injectable()
export class CompanyService {

  constructor(private http : Http) { }

  loadItem(): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/company`)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  getItem(id): Observable<any[]> {
    let bodyString = JSON.stringify(id);
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.apiUrl}/company/findByID/${id}` , options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  searchItem(body): Observable<any> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.apiUrl}/company/search`, bodyString , options)
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error));
  }

  addData(body): Observable<any[]> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${environment.apiUrl}/company`, bodyString, options) // ...using post request
      .map((res: Response) => { 
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  updateData(id, body): Observable<any[]> {
    let bodyString = JSON.stringify(id); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.put(`${environment.apiUrl}/company/${id}`, bodyString, options) // ...using post request
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
