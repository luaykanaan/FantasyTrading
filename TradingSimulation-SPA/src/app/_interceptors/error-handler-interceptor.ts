import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
import * as Sentry from '@sentry/browser';

@Injectable()
export class ErrorHandlerInterceptor implements ErrorHandler {

    handleError(error: any): void {

        if (!isDevMode) {
            Sentry.captureException(error.originalError || error);
        } else {
            console.log('Error caught in interceptor and re-thrown.');
            throw error;
        }
    }

}

// definition to add to the providers array in app module
export const ErrorHandlerInterceptorProvider = {
    provide: ErrorHandler,
    useClass: ErrorHandlerInterceptor
};
