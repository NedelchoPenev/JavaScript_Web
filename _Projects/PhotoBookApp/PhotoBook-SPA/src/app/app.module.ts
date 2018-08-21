import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  BsDropdownModule,
  TabsModule,
  BsDatepickerModule,
  PaginationModule,
  ButtonsModule,
  ModalModule,
  CarouselModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { AlertifyService } from './services/alertify.service';
import { MessagesComponent } from './messages/messages.component';
import { FavoritePhotographersComponent } from './photographers/favorite-photographers/favorite-photographers.component';
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
import { FavoritePhotographersResolver } from './resolvers/favorite-photographer-resolver';
import { MessagesResolver } from './resolvers/messages-resolver';
import { PhotographerMessagesComponent } from './photographers/photographer-messages/photographer-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserManagmentComponent } from './admin/user-managment/user-managment.component';
import { PhotoManagmentComponent } from './admin/photo-managment/photo-managment.component';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';

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
    TimeAgoPipe,
    PhotoEditorComponent,
    PhotographerMessagesComponent,
    AdminPanelComponent,
    UserManagmentComponent,
    PhotoManagmentComponent,
    RolesModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxGalleryModule,
    FileUploadModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
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
    EditProfileResolver,
    FavoritePhotographersResolver,
    MessagesResolver
  ],
  entryComponents: [RolesModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
