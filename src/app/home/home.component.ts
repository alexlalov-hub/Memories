import { Component, OnInit } from '@angular/core';
import {PostService} from "../services/post.service";
import IPost from "../models/post.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    posts: IPost[] = []

  constructor(private postService: PostService) { }

  ngOnInit(): void {
      this.postService.getPostsForHome().then(posts => {
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
