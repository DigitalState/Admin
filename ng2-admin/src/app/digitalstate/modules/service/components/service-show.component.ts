import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import 'rxjs/Rx';
import { Link } from '../../../models/link';

@Component({
    selector: 'ds-service-show',
    templateUrl: '../templates/service-show.template.html'
})
export class DsServiceShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'services';
    pageTitle = 'general.menu.serviceDirectory';
    headerTitle = 'ds.microservices.entity.types.service';
    backLink = new Link(['../../list'], 'general.list');

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }
}
