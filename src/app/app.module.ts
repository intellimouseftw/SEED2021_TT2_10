import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { NavbarComponent } from './navbar/navbar.component';
import { TransferComponent } from './transfer/transfer.component';
import {​​​​​​​​ HttpClientModule, HTTP_INTERCEPTORS }​​​​​​​​ from'@angular/common/http';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JWTInterceptor } from './_interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    TransferComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
