import { Component, Injector } from '@angular/core';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';

import 'rxjs/Rx';

@Component({
    selector: 'ds-user-create',
    templateUrl: '../templates/user-form.template.html'
})
export class DsUserCreateComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'users';
    headerTitle = 'ds.microservices.entity.types.user';
    isNew = true;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }
}
