import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';


@Component({
    selector: 'ds-text-show',
    templateUrl: '../templates/text-show.template.html'
})
export class DsTextShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'texts';
    pageTitle = 'general.menu.cms';
    headerTitle = 'ds.microservices.entity.types.text';
    backLink = new Link(['../../list'], 'general.list');

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

}
