import { Component, Injector } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { EntityApiService } from '../entity-api.service';
import { DsCmsFormComponent } from './cms-form.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-data-create',
    templateUrl: '../templates/data-form.template.html'
})
export class DsDataCreateComponent extends DsCmsFormComponent {

    entityUrlPrefix = 'datas';
    pageTitle = 'general.menu.cms';
    headerTitle = 'ds.microservices.entity.types.data';
    backLink = new Link(['../list'], 'general.list');
    isNew = true;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }

    /**
     * Overriding default validators to add the custom JSON validator from ng2-validation
     *
     * @param form
     */
    onFormInit(form: NgForm) {
        super.onFormInit(form);

        setTimeout(() => {
            form.controls['data'].setValidators([
                Validators.required,
                CustomValidators.json,
            ]);
        }, 0);
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;

            try {
                if (entity.data) {
                    Object.keys(entity.data).forEach(function(key) {
                        entity.data[key] = JSON.stringify(entity.data[key], null, 2);
                    });
                }
            }
            catch(e) {
                console.warn('Error parsing incoming JSON', e)
            }

            return Observable.of({'entity': entity});
        });
    }
}
