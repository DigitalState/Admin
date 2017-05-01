import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-show',
    templateUrl: '../templates/show.template.html'
})
export class DsServiceShowComponent {

    public entity;

    private id: number;

    constructor(private route: ActivatedRoute, private router: Router, private restangular: Restangular) {

    }

    ngOnInit() {

        this.route.params.forEach((params: Params) => {
            this.id = params['id'];
            console.log(this.id);
        });

        this.restangular.one('services', this.id).get().subscribe(res => {
            this.entity = res;
        });
    }
}
