import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';


@Component({
    selector: 'ds-page-show',
    templateUrl: '../templates/page-show.template.html'
})
export class DsPageShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'pages';
    pageTitle = 'general.menu.cms';
    headerTitle = 'ds.microservices.entity.types.page';
    backLink = new Link(['../../list'], 'general.list');

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

}
