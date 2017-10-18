import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { EntityApiService } from '../entity-api.service';
import { DsFileFormComponent } from './file-form.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';

@Component({
    selector: 'ds-file-edit',
    templateUrl: '../templates/file-form.template.html'
})
export class DsFileEditComponent extends DsFileFormComponent {

    backLink = new Link(['../../list'], 'general.list');
    isNew = false;


    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}
