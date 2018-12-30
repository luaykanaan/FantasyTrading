import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

// #
// #
// # use this interceptor to attach jwt bearer token to all http requests
// #
// #

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        let token;
        this.authService.undecodedToken$.subscribe(value => {
            token = value;
            if (token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + token
                    }
                });
            }
        });
        return next.handle(request);
    }
}


// definition to add to the providers array in app module
export const HttpRequestInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
};

