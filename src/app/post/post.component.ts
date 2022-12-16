import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../services/post.service";
import IPost from "../models/post.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    id = ''
    post: IPost | null = null
    user: firebase.User | null = null

    constructor(private route: ActivatedRoute, private postService: PostService, private auth: AngularFireAuth) {
        auth.user.subscribe(user => this.user = user)
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = params.id
        })

        this.postService.getPostById(this.id).then(post => {
            this.post = null

            post?.forEach(doc => {
                this.post = {
                    id: doc.id,
                    ...doc.data() as IPost
                }
            })
        })

    }
}
