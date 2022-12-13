import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {UploadComponent} from "./upload/upload.component";
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";
import {ProfileComponent} from "./profile/profile.component";

const redirect = () => redirectUnauthorizedTo('/')

const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
          authGuardPipe: redirect
        },
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'upload',
        component: UploadComponent,
        data: {
            authGuardPipe: redirect
        },
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'catalog',
        component: CatalogComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
