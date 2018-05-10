//import {HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
/*
  Generated class for the MyHttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class MyHttpInterceptorProvider implements HttpInterceptor {

    constructor() {
        console.log('Hello MyHttpInterceptorProvider Provider');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = req;
        const token = window.localStorage.getItem('token');
        if(token){
            authRequest = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }
        return next.handle(authRequest);
    }

}
