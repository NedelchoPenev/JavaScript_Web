import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { AlertifyService } from './services/alertify.service';
import { MessagesComponent } from './messages/messages.component';
import { FavoritePhotographersComponent } from './favorite-photographers/favorite-photographers.component';
import { AllPhotographersComponent } from './photographers/all-photographers/all-photographers.component';
import { FavoritePhotosComponent } from './favorite-photos/favorite-photos.component';
import { AllPhotosComponent } from './all-photos/all-photos.component';
import { appRoutes } from './routes';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { PhotopgrapherCardComponent } from './photographers/photopgrapher-card/photopgrapher-card.component';
import { DetailPhotographerComponent } from './photographers/detail-photographer/detail-photographer.component';
import { PhotographerDetailResolver } from './resolvers/photographer-detail-resolver';
import { AllPhotographersResolver } from './resolvers/all-photographer-resolver';
import { EditProfileComponent } from './photographers/edit-profile/edit-profile.component';
import { EditProfileResolver } from './resolvers/edit-profile-resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes-guard';
import { PhotoEditorComponent } from './photographers/photo-editor/photo-editor.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

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
    AllPhotosComponent,
    PhotopgrapherCardComponent,
    DetailPhotographerComponent,
    EditProfileComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxGalleryModule,
    FileUploadModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth/']
        }
      })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanges,
    UserService,
    PhotographerDetailResolver,
    AllPhotographersResolver,
    EditProfileResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
