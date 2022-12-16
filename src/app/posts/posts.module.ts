import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { UploadComponent } from './upload/upload.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    CatalogComponent,
    UploadComponent,
    ProfileComponent,
    EditComponent
  ],
    imports: [
        CommonModule,
        PostsRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class PostsModule { }
