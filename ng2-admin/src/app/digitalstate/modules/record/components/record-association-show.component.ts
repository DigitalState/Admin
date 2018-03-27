import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import 'rxjs/Rx';

@Component({
    selector: 'ds-record-association-show',
    templateUrl: '../templates/record-association-show.template.html'
})
export class DsRecordAssociationShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'record-associations';
    entityParentUrlPrefix = 'records';
    entityParentUrlParam = 'recordUuid';
    headerTitle = 'ds.microservices.entity.types.recordAssociation';
    headerSubtitle = null;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;

        // Create a place-holder for the back-link until it gets generated
        this.backLink = this.getEmptyBackLink();
    }
}
