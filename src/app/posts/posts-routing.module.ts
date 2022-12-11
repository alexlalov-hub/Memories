import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {UploadComponent} from "./upload/upload.component";
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";

const redirect = () => redirectUnauthorizedTo('/')

const routes: Routes = [
    {
        path: 'profile',
        component: CatalogComponent,
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
        redirectTo: 'profile'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
