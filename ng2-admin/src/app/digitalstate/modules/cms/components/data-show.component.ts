import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';


@Component({
    selector: 'ds-data-show',
    templateUrl: '../templates/data-show.template.html'
})
export class DsDataShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'datas';
    pageTitle = 'general.menu.cms';
    headerTitle = 'ds.microservices.entity.types.data';
    backLink = new Link(['../../list'], 'general.list');

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

}
