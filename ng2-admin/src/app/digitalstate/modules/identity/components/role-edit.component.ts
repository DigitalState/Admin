import { Component, Injector } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from 'ng2-validation';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-role-edit',
    templateUrl: '../templates/role-form.template.html'
})
export class DsRoleEditComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'roles';
    pageTitle = 'general.menu.identities';
    headerTitle = 'ds.microservices.entity.types.role';
    backLink = new Link(['../../list'], 'general.list');
    isNew = false;

    constructor(injector: Injector,
                translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);

        this.translate = translate;
        this.entityApiService = entityApiService;
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

            this.entity = entity;
            return Observable.of({'entity': entity});
        });
    }
}
