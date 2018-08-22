import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { AllPhotographersComponent } from './photographers/all-photographers/all-photographers.component';
import { FavoritePhotographersComponent } from './photographers/favorite-photographers/favorite-photographers.component';
import { AllPhotosComponent } from './photo/all-photos/all-photos.component';
import { FavoritePhotosComponent } from './photo/favorite-photos/favorite-photos.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailPhotographerComponent } from './photographers/detail-photographer/detail-photographer.component';
import { PhotographerDetailResolver } from './resolvers/photographer-detail-resolver';
import { AllPhotographersResolver } from './resolvers/all-photographer-resolver';
import { EditProfileComponent } from './photographers/edit-profile/edit-profile.component';
import { EditProfileResolver } from './resolvers/edit-profile-resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes-guard';
import { FavoritePhotographersResolver } from './resolvers/favorite-photographer-resolver';
import { MessagesResolver } from './resolvers/messages-resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: {messages: MessagesResolver}
      },
      {
        path: 'photographers/all',
        component: AllPhotographersComponent,
        resolve: { users: AllPhotographersResolver }
      },
      {
        path: 'photographer/edit',
        component: EditProfileComponent,
        resolve: { user: EditProfileResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: 'photographer/:id',
        component: DetailPhotographerComponent,
        resolve: { user: PhotographerDetailResolver }
      },
      {
        path: 'photographers/favorite',
        component: FavoritePhotographersComponent,
        resolve: { users: FavoritePhotographersResolver }
      },
      { path: 'photos/all', component: AllPhotosComponent },
      { path: 'photos/favorite', component: FavoritePhotosComponent },
      { path: 'admin', component: AdminPanelComponent,  data: {roles: ['Admin', 'Moderator']}}
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
