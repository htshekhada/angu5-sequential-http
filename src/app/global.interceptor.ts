import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,

    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Subject'

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  
  private requests$ = new Subject();
  private queue: any[] = [];

    //constructor(public auth: AuthService) {}
    constructor() {
        
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(request).do((event: any) => {
            if (event instanceof HttpResponse) {
                console.log(`response`);
            }
        })
        // request = request.clone({
        //   setHeaders: {
        //     Authorization: `Bearer ${this.auth.getToken()}`
        //   }
        // });

        //console.log('in interceptor');

        // return Observable.of(null).mergeMap(() => {
        //         return next.handle(request);
        // })
        // .materialize()
        // .delay(10000)
        // .dematerialize();

    }
}