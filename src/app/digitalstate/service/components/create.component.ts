import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-edit',
    templateUrl: '../templates/edit.template.html'
})
export class DsServiceCreateComponent {

    public entity;

    private id: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private restangular: Restangular,
                private toastr: ToastsManager) {

    }

    ngOnInit() {
        this.entity = {};
        // this.route.params.forEach((params: Params) => {
        //     this.id = params['id'];
        //     console.log(this.id);
        // });
        //
        // this.restangular.one('services', this.id).get().subscribe(res => {
        //     this.entity = res;
        // });
    }

    submitForm(form) {
        console.log(form.value);
        this.restangular.all('services').post(form.value)
            .subscribe((response) => {
                console.log('Entity saved successfully, server response: ', response);
                this.toastr.success('Entity saved successfully');
                this.router.navigate(['../list'], {relativeTo: this.route});
            }, (error) => {
                console.error('There was an error saving entity', error);
                this.toastr.error('Failed to save the entity');
            });

        // this.router.navigate(['../list'], { relativeTo: this.route });
        // this.router.navigate(['../show'], { relativeTo: this.route });
    }

    cancelForm() {
        this.router.navigate(['../show'], { relativeTo: this.route });
    }
}
