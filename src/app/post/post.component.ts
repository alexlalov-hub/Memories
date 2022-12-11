import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    id = ''

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = params.id
        })
  }

}
