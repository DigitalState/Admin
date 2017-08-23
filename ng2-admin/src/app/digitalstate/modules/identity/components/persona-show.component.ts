import { Component, Injector } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { IdentityApiService } from '../../../../shared/services/identity.service';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { IdentityUtils } from '../../../../shared/utils/identity.utils';

@Component({
    selector: 'ds-persona-show',
    templateUrl: '../templates/persona-show.template.html'
})
export class DsPersonaShowComponent extends DsBaseEntityShowComponent {

    entityParentUrlParam = 'identityUuid';
    headerTitle = 'ds.microservices.entity.types.persona';
    backLink = new Link(['../../../show'], 'ds.microservices.entity.types.identity');

    identityPersonaEntity: any;
    ownerEntity: any;

    protected routeParamsSubscription: Subscription;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
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
}
