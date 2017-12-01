import { Component, Injector } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from 'ng2-validation';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { IdentityUtils } from '../../../../shared/utils/identity.utils';

import { Link } from '../../../models/link';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import { DsPersonaFormComponent } from './persona-form.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-persona-edit',
    templateUrl: '../templates/persona-form.template.html'
})
export class DsPersonaEditComponent extends DsPersonaFormComponent {

    entityParentUrlParam = 'identityUuid';
    headerTitle = 'ds.microservices.entity.types.persona';
    headerSubtitle = null;
    backLink = new Link(['../../../show'], 'ds.microservices.entity.types.identity');
    isNew = false;

    protected routeParamsSubscription: Subscription;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }

    ngOnInit() {
        this.routeParamsSubscription = this.route.params.subscribe(params => {
            this.entityUrlPrefix = IdentityUtils.getSingular(params['identityPlural']) + '-personas';
            this.entityParentUrlPrefix = params['identityPlural'];
            super.ngOnInit();
        });
    }

    ngOnDestroy() {
        if (this.routeParamsSubscription) {
            this.routeParamsSubscription.unsubscribe();
        }
        super.ngOnDestroy();
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
                    entity.data = JSON.stringify(entity.data, null, 2);
                }
            }
            catch(e) {
                console.warn('Error parsing incoming JSON', e)
            }

            return Observable.of({'entity': entity, 'entityParent': prepared.entityParent});
        });
    }

}
