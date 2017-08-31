import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';


@Injectable()
export class IssueAttachService {

  options: RequestOptions;

  constructor(private http: Http) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token')
    });
    this.options = new RequestOptions({ headers: headers });
  }

  makeFileRequest(fildname: string, url: string, params: any, fileList: Array<File>): Observable<any> {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append(fildname, file, file.name);
      for (var p in params) {
        formData.append(p, params[p]);
      }
      let headers = new Headers({
      });
      /** No need to include Content-Type in Angular 4 */
      // headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'bearer ' + localStorage.getItem('token'));
      let options = new RequestOptions({
        headers: headers
      });
      return this.http.post(url, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error));
    }
  }

  removeFile(id,body): Observable<any> {
    
    let bodyString = JSON.stringify(body);
    console.log(body);
    return this.http.post(`${environment.apiUrl}/issue/attach/remove/${id}`, body, this.options) //set urlไว้ที environment.ts 
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  listFile(id): Observable<any> { // environment.apiUrl + '/company'  สามารถเขียนแบบนี้แทนได้ เป็นการต่อ string
    return this.http.get(`${environment.apiUrl}/issue/attach/${id}`, this.options) //set urlไว้ที environment.ts 
      .map((res: Response) => {
        return res.json()
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
