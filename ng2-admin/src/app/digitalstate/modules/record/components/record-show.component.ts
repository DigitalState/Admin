import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';

@Component({
    selector: 'ds-record-show',
    templateUrl: '../templates/record-show.template.html'
})
export class DsRecordShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'records';
    pageTitle = 'general.menu.records';
    headerTitle = 'ds.microservices.entity.types.record';
    backLink = new Link(['../../list'], 'general.list');

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }
}
