import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Restangular } from 'ngx-restangular';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import 'rxjs/Rx';

// @Component({
//     selector: 'ds-service-entity-form',
//     templateUrl: '../templates/form.template.html'
// })
export abstract class DsEntityFormComponent implements AfterViewChecked {

    entityForm: NgForm;
    @ViewChild('entityForm') currentForm: NgForm;

    formErrors = {
        'title': '',
        'presentation': '',
        'form': '',
        'description': '',
    };

    validationMessages = {
        'title': {
            'required':      'Title is required.',
            'minlength':     'Title must be at least 4 characters long.',
            'maxlength':     'Title cannot be more than 24 characters long.',
            'someCustomValidationDirective': 'Someone named "Bob" cannot be a hero.'
        },
        'presentation': {
            'required': 'Presentation is required.'
        },
        'form': {
            'required': 'Form is required.'
        },
        'description': {
            'required': 'Description is required.'
        },
    };

    entity: any;
    submitted: boolean = false;
    isNew: boolean;
    formTitle: string = '';

    protected id: number;


    /*
     Reset the form with a new hero AND restore 'pristine' class state
     by toggling 'active' flag which causes the form
     to be removed/re-added in a tick via NgIf
     TODO: Workaround until NgForm has a reset method (#6822)
     */
    private active = true;

    constructor(protected route: ActivatedRoute,
                protected router: Router,
                protected location: Location,
                protected restangular: Restangular,
                protected toastr: ToastsManager) {

    }

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.entityForm) {
            return;
        }

        this.entityForm = this.currentForm;
        if (this.entityForm) {
            this.entityForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onValueChanged(data?: any) {
        if (!this.entityForm) { return; }
        const form = this.entityForm.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    cancelForm() {
        this.location.back();
    }
}
