import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-page-create',
    templateUrl: '../templates/page-form.template.html'
})
export class DsPageCreateComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'pages';
    pageTitle = 'general.menu.cms';
    headerTitle = 'ds.microservices.entity.types.page';
    backLink = new Link(['../list'], 'general.list');
    isNew = true;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

}
