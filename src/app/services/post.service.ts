import {Injectable} from '@angular/core';
import IPost from "../models/post.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import {Router} from "@angular/router";

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
            author: this.user?.displayName,
            title: postData.title,
            description: postData.description,
            imageUrl: postData.imageUrl,
            timestamp: firebase.firestore.Timestamp.now()
        })

        await this.router.navigateByUrl('/profile?sortBy=asc')
    }

    public async getAllPosts(sortingOrder: string){
        const posts = this.collection.ref.orderBy('timestamp', sortingOrder === 'desc' ? 'desc' : 'asc')

        return posts.get()
    }

    public async getUsersPosts(sortingOrder: string){
        if(!this.user){
            return null;
        }

        const posts = this.collection.ref.where(
            'uid', '==', this.user.uid
        ).orderBy('timestamp', sortingOrder === 'asc' ? 'asc' : 'desc')

        return posts.get()
    }

    public async getPostById(id: string){
        return this.collection.doc(id).get()
    }

    public async updatePost(id: string, title: string, description: string){
        await this.collection.doc(id).update({ title: title, description: description})

        await this.router.navigateByUrl('/profile?sortBy=asc')
    }

    public async deletePost(id: string){
        await this.collection.doc(id).delete()
    }

    public async getPostsForHome(){
        const posts = this.collection.ref.orderBy('timestamp', 'desc').limit(6)

        return posts.get()
    }
}
