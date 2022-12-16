import { Component, OnInit } from '@angular/core';
import IPost from "../../models/post.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    sortingOrder = 'asc'
    posts: IPost[] = []


    constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.sortingOrder = params.sortBy === 'desc' ? 'desc' : 'asc'
        })

        this.postService.getUsersPosts().then(posts => {
            this.posts = []

            posts?.forEach(doc => {
                this.posts.push({
                    id: doc.id,
                    ...doc.data() as IPost
                })
            })
        })
    }

    query(event: Event) {
        const {value} = (event.target as HTMLSelectElement)

        this.router.navigateByUrl(`/profile?sortBy=${value === '1' ? 'asc' : 'desc'}`)

    }

    async deletePost(id: string){
        await this.postService.deletePost(id)
    }

}
