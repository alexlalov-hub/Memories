import {Injectable} from '@angular/core';
import IPost from "../models/post.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private collection: AngularFirestoreCollection;
    user: firebase.User | null = null;

    constructor(private auth: AngularFireAuth, private database: AngularFirestore, private router: Router) {
        this.collection = database.collection('post')
        auth.user.subscribe(user => this.user = user)
    }

    public async createPost(postData: IPost){
        if(!postData.title){
            throw new Error('Title not provided!')
        }
        if(!postData.description){
            throw new Error('Description not provided!')
        }
        if(!postData.imageUrl){
            throw new Error('Image not provided!')
        }

        await this.collection.add({
            uid: this.user?.uid,
            title: postData.title,
            description: postData.description,
            imageUrl: postData.imageUrl,
            timestamp: firebase.firestore.Timestamp.now()
        })

        await this.router.navigateByUrl('/profile?sortBy=asc')
    }

    public async getAllPosts(){
        const posts = this.collection.ref

        return posts.get()
    }

    public async getUsersPosts(){
        if(!this.user){
            return null;
        }

        console.log(this.user.uid)
        const posts = this.collection.ref.where(
            'uid', '==', this.user.uid
        )

        return posts.get()
    }

}
