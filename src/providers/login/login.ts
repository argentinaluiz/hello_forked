import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginProvider {
  data:any;


  private apiUrl = 'http://www.magisclick.com.br/api/';

  // private apiUrl = 'https://reqres.in/api/';

  constructor(public httpClient: HttpClient) {
  }


  getToken(user): Observable<string[]> {
    return this.httpClient.post(this.apiUrl+"guardian_login",user)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = err; //${error.status} - ${error.statusText || ''} ${err};
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    if(errMsg == '{"isTrusted":true}'){
      return 'N';
    } else {
      return Observable.throw(errMsg);
    }
  }

}