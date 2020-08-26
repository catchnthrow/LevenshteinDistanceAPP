import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("TokenInterceptor intercept called");
    const item = localStorage.getItem('user-token');
    const token = item != null && item.length > 0 ? `Bearer ` + item : '';
    
    if(token != '') {
        console.log('Adding Auth JWT token');
        request = request.clone({
            setHeaders: {
              Authorization: token
            }
        });
    } 
    return next.handle(request);
  }
}
