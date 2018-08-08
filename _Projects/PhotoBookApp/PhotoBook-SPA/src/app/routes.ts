import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { AllPhotographersComponent } from './photographers/all-photographers/all-photographers.component';
import { FavoritePhotographersComponent } from './favorite-photographers/favorite-photographers.component';
import { AllPhotosComponent } from './all-photos/all-photos.component';
import { FavoritePhotosComponent } from './favorite-photos/favorite-photos.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailPhotographerComponent } from './photographers/detail-photographer/detail-photographer.component';
import { PhotographerDetailResolver } from './resolvers/photographer-detail-resolver';
import { AllPhotographersResolver } from './resolvers/all-photographer-resolver';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
            { path: 'photographers/all', component: AllPhotographersComponent,
                resolve: {users: AllPhotographersResolver} },
            { path: 'photographer/:id', component: DetailPhotographerComponent,
                resolve: {user: PhotographerDetailResolver}},
            { path: 'photographers/favorite', component: FavoritePhotographersComponent },
            { path: 'photos/all', component: AllPhotosComponent },
            { path: 'photos/favorite', component: FavoritePhotosComponent }
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
