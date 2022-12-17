import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import IPost from "../../models/post.model";
import {timeout} from "rxjs";

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
    sortingOrder = 'asc'
    posts: IPost[] = []


    constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.sortingOrder = params.sortBy === 'asc' ? 'asc' : 'desc'
        })

        this.postService.getAllPosts(this.sortingOrder === 'asc' ? 'desc' : 'asc').then(posts => {
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

        this.router.navigateByUrl(`/catalog?sortBy=${value === '1' ? 'asc' : 'desc'}`)

        this.postService.getAllPosts(this.sortingOrder).then(posts => {
            this.posts = []

            posts?.forEach(doc => {
                this.posts.push({
                    id: doc.id,
                    ...doc.data() as IPost
                })
            })
        })
    }
}
