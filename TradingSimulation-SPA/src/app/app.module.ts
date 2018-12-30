import { ErrorHandlerInterceptorProvider } from './_interceptors/error-handler-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { MatMenuModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatButtonModule, MatInputModule } from '@angular/material';
import { MatProgressSpinnerModule, MatSelectModule, MatDividerModule, MatRippleModule, MatTooltipModule } from '@angular/material';
import { MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { AvatarModule } from 'ngx-avatar';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpRequestInterceptorProvider } from './_interceptors/http.request.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import * as Sentry from '@sentry/browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WalletsContainerComponent } from './wallets-container/wallets-container.component';
import { CustomCurrencyPipe } from './_pipes/custom-currency.pipe';
import { PairCardComponent } from './pair-card/pair-card.component';
import { StreamContainerComponent } from './stream-container/stream-container.component';
import { DatatableContainerComponent } from './datatable-container/datatable-container.component';


Sentry.init({ dsn: 'https://0191315272ff4e3683142dfd30891c60@sentry.io/1357704' });

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      WalletsContainerComponent,
      CustomCurrencyPipe,
      PairCardComponent,
      StreamContainerComponent,
      DatatableContainerComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FormsModule,
      MatMenuModule,
      MatSidenavModule,
      MatToolbarModule,
      MatCardModule,
      MatButtonModule,
      MatInputModule,
      ToastrModule.forRoot({ timeOut: 7500, positionClass: 'toast-bottom-right', preventDuplicates: true, newestOnTop: true }),
      MatProgressSpinnerModule,
      MatSelectModule,
      MatDividerModule,
      AvatarModule,
      BsDropdownModule.forRoot(),
      NgxChartsModule,
      MatRippleModule,
      MatTooltipModule,
      MatFormFieldModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
   ],
   providers: [
      AuthService,
      UserService,
      HttpRequestInterceptorProvider,
      DatePipe,
      ErrorHandlerInterceptorProvider,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
