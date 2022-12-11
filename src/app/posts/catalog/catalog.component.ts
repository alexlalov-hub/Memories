import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
    sortingOrder = 'asc'

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.sortingOrder = params.sortBy === 'desc' ? 'desc' : 'asc'
        })
    }

    query(event: Event) {
        const {value} = (event.target as HTMLSelectElement)

        this.router.navigateByUrl(`/profile?sortBy=${value === '1' ? 'asc' : 'desc'}`)

    }
}
