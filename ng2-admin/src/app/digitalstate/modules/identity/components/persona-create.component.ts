import { Component, Injector } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { IdentityUtils } from '../../../../shared/utils/identity.utils';

import { Link } from '../../../models/link';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import { DsPersonaFormComponent } from './persona-form.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-persona-create',
    templateUrl: '../templates/persona-form.template.html'
})
export class DsPersonaCreateComponent extends DsPersonaFormComponent {

    entityParentUrlParam = 'identityUuid';
    headerTitle = 'ds.microservices.entity.types.persona';
    headerSubtitle = null;
    backLink = new Link(['../../../show'], 'ds.microservices.entity.types.identity');
    isNew = true;

    routeParamsSubscription: Subscription;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }

    ngOnInit() {
        this.routeParamsSubscription = this.route.params.subscribe(params => {
            const identitySingular = IdentityUtils.getSingular(params['identityPlural']);
            this.entityUrlPrefix = identitySingular + '-personas';
            this.entityParentUrlPrefix = params['identityPlural'];

            this.entityApiService.getOne(this.entityParentUrlPrefix, params[this.entityParentUrlParam]).subscribe(res => {
                this.entityParent = res;
                super.ngOnInit();
            });
        });
    }

    ngOnDestroy() {
        if (this.routeParamsSubscription) {
            this.routeParamsSubscription.unsubscribe();
        }
        super.ngOnDestroy();
    }

    /**
     * Add the `Case` association to the newly created `Case Status` entity by assigning
     * the case's IRI to the `case` property.
     */
    protected createBlankEntity(): any {
        return this.route.params.flatMap(params => {
            return super.createBlankEntity().flatMap(entity => {
                const identitySingular = IdentityUtils.getSingular(params['identityPlural']);
                entity[identitySingular] = '/' + this.entityParentUrlPrefix + '/' + params[this.entityParentUrlParam];
                entity.owner = this.entityParent.owner;
                entity.ownerUuid = this.entityParent.ownerUuid;

                // Stringify JSON property
                try {
                    if (entity.data) {
                        entity.data = JSON.stringify(entity.data, null, 2);
                    }
                }
                catch(e) {
                    console.warn('Error parsing incoming JSON', e)
                }

                return Observable.of(entity);
            });
        });
    }
}
