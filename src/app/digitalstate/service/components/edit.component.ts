import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Restangular } from 'ngx-restangular';
import { ToastsManager } from 'ng2-toastr';
import { DsEntityFormComponent } from './entity-form.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-edit',
    templateUrl: '../templates/form.template.html'
})
export class DsServiceEditComponent extends DsEntityFormComponent {

    formTitle = '';

    constructor(route: ActivatedRoute,
                router: Router,
                location: Location,
                restangular: Restangular,
                toastr: ToastsManager) {
        super(route, router, location, restangular, toastr);
    }

    ngOnInit() {
        this.isNew = false;

        this.route.params.forEach((params: Params) => {
            this.id = params['id'];
            console.log(this.id);
        });

        this.restangular.one('services', this.id).get().subscribe(res => {
            this.entity = res;
            this.formTitle = this.entity.uuid;
        });
    }

    onSubmit() {
        console.log(this.entityForm.value);
        this.entity.put().subscribe((response) => {
            console.log('Entity saved successfully, server response: ', response);
            this.toastr.success('Entity saved successfully');
            this.router.navigate(['../show'], {relativeTo: this.route});
        }, (error) => {
            console.error('There was an error saving entity', error);
            this.toastr.error('Failed to save the entity');
        });
    }

    // cancelForm() {
    //     this.router.navigate(['../show'], { relativeTo: this.route });
    // }
}
