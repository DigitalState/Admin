import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-show',
    templateUrl: '../templates/show.template.html'
})
export class DsServiceShowComponent {

    public entity;

    private id: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private restangular: Restangular,
                private toastr: ToastsManager) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.id = params['id'];
            console.log(this.id);
        });

        this.restangular.one('services', this.id).withHttpConfig({ cache: false }).get().subscribe(res => {
            this.entity = res;
        });
    }

    deleteEntity() {
        this.entity.remove()
        .subscribe((response) => {
            console.log('Entity deleted successfully, server response: ', response);
            this.toastr.success('Entity deleted successfully');
            this.router.navigate(['../../list'], { relativeTo: this.route });
        }, (error) => {
            console.error('Failed to delete entity', error);
            this.toastr.error('Failed to delete entity');
        });
    }
}
