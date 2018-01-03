import { Injectable }     from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';
import {Subject} from 'rxjs/Subject'

export class PendingRequest {
  url: string;
  method: string;
  options: any;
  subscription: Subject<any>;

  constructor(url: string, method: string, options: any, subscription: Subject<any>) {
    this.url = url;
    this.method = method;
    this.options = options;
    this.subscription = subscription;
  }
}

@Injectable()
export class BackendService {
  // This is your private requests queue emitter.
  private requests$ = new Subject<any>();
  private queue: PendingRequest[] = [];

  constructor(private httpClient: HttpClient) {
    // subscribe to that queue up there
    this.addRequestToQueue.bind(this);
    this.execute.bind(this);
    this.requests$.subscribe(request => this.execute(request));
  }

  // This is your public API - you can extend it to get/post/put or specific
  // endpoints like 'getUserProfile()' etc.
  invoke(url, method, params, options) {
      return this.addRequestToQueue(url, method, params, options);
  }

  private execute(requestData) {
//    const req = this.httpClient.request(requestData.method, requestData.url, requestData.options)
      // as a last step, invoke next request if any
//      .finally(() => this.startNextRequest());

    const req = this.httpClient.get(requestData.url)
        .subscribe(res=>{
            const sub = requestData.subscription;
            sub.next(res);
            this.queue.shift();
            this.startNextRequest();

        });

        //.finally(() => this.startNextRequest());

    
    //sub.switchMap(req);

  }

  private addRequestToQueue(url, method, params, options) {
    const sub = new Subject<any>();
    const request = new PendingRequest(url, method, options, sub);
    
    // if there are no pending req's, execute immediately.
    // if (this.queue.length === 0) {
    //   this.requests$.next(request);
    // } else {
    //   // otherwise put it to queue.
    //   this.queue.push(request);
    // }
    this.queue.push(request);
    // this.startNextRequest();
    if (this.queue.length === 1) {
        this.startNextRequest();
    }

    return sub;
  }

  private startNextRequest() {
    // get next request, if any.
    if (this.queue.length > 0) {
      this.execute(this.queue[0]);
    }
  }
}