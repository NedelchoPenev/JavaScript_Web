import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { AlertifyService } from './services/alertify.service';
import { MessagesComponent } from './messages/messages.component';
import { FavoritePhotographersComponent } from './favorite-photographers/favorite-photographers.component';
import { AllPhotographersComponent } from './all-photographers/all-photographers.component';
import { FavoritePhotosComponent } from './favorite-photos/favorite-photos.component';
import { AllPhotosComponent } from './all-photos/all-photos.component';
import { appRoutes } from './routes';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MessagesComponent,
      FavoritePhotographersComponent,
      AllPhotographersComponent,
      FavoritePhotosComponent,
      AllPhotosComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      FormsModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
