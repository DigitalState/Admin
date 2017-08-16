import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import 'rxjs/Rx';

@Component({
    selector: 'ds-case-status-show',
    templateUrl: '../templates/status-show.template.html'
})
export class DsCaseStatusShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'case-statuses';
    entityParentUrlPrefix = 'cases';
    entityParentUrlParam = 'caseUuid';
    headerTitle = 'ds.microservices.entity.types.caseStatus';
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
