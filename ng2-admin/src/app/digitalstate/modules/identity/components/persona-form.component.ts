import { Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { Link } from '../../../models/link';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';

import 'rxjs/Rx';

export class DsPersonaFormComponent extends DsBaseEntityFormComponent {

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);

        this.entityApiService = entityApiService;
    }

    protected generateBackLink(): Link {
        let backLink = super.generateBackLink();
        backLink.routerLink.splice(2, 0, 'identities');
        return backLink;
    }
}