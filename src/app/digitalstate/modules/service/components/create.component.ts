import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Restangular } from 'ngx-restangular';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { DsEntityFormComponent } from './entity-form.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-create',
    templateUrl: '../templates/form.template.html'
})
export class DsServiceCreateComponent extends DsEntityFormComponent {

    formTitle = 'Create Service';

    constructor(route: ActivatedRoute,
                router: Router,
                location: Location,
                restangular: Restangular,
                toastr: ToastsManager) {
        super(route, router, location, restangular, toastr);
    }

    ngOnInit() {
        this.isNew = true;
        this.entity = {};
    }

    onSubmit() {
        console.log(this.entityForm.value);
        this.submitted = true;
        this.restangular.all('services').post(this.entityForm.value)
            .subscribe((response) => {
                console.log('Entity saved successfully, server response: ', response);
                this.toastr.success('Entity saved successfully');
                this.router.navigate(['../list'], {relativeTo: this.route});
            }, (error) => {
                console.error('There was an error saving entity', error);
                this.toastr.error('Failed to save the entity');
            });
    }

    // cancelForm() {
    //     this.router.navigate(['../list'], { relativeTo: this.route });
    // }
}
