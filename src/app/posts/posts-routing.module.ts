import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {UploadComponent} from "./upload/upload.component";
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";
import {ProfileComponent} from "./profile/profile.component";
import {EditComponent} from "./edit/edit.component";

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
    },
    {
        path: 'edit/:id',
        component: EditComponent,
        data: {
            authGuardPipe: redirect
        },
        canActivate: [AngularFireAuthGuard]

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
