import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { EntityApiService } from '../entity-api.service';
import { DsCmsFormComponent } from './cms-form.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-text-edit',
    templateUrl: '../templates/text-form.template.html'
})
export class DsTextEditComponent extends DsCmsFormComponent {

    entityUrlPrefix = 'texts';
    pageTitle = 'general.menu.cms';
    headerTitle = 'ds.microservices.entity.types.text';
    backLink = new Link(['../../list'], 'general.list');
    isNew = false;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}
