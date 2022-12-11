import {NgModule} from '@angular/core';
import {environment} from "../environments/environment";
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {UserModule} from "./user/user.module";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { HomeComponent } from './home/home.component';
import {PostsModule} from "./posts/posts.module";
import { PostComponent } from './post/post.component';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        PostComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        UserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        PostsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
