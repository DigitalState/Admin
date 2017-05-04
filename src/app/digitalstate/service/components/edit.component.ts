import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { ToastsManager } from 'ng2-toastr';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-edit',
    templateUrl: '../templates/edit.template.html'
})
export class DsServiceEditComponent {

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

        this.restangular.one('services', this.id).get().subscribe(res => {
            this.entity = res;
        });
    }

    submitForm(form) {
        console.log(form.value);
        this.entity.put().subscribe((response) => {
            console.log('Entity saved successfully, server response: ', response);
            this.toastr.success('Entity saved successfully');
            this.router.navigate(['../show'], {relativeTo: this.route});
        }, (error) => {
            console.error('There was an error saving entity', error);
            this.toastr.error('Failed to save the entity');
        });
    }

    cancelForm() {
        this.router.navigate(['../show'], { relativeTo: this.route });
    }
}
