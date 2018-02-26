import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { IdentityApiService } from '../../../../shared/services/identity.service';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-role-show',
    templateUrl: '../templates/role-show.template.html'
})
export class DsRoleShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'roles';
    pageTitle = 'general.menu.identities';
    headerTitle = 'ds.microservices.entity.types.role';
    backLink = new Link(['../../list'], 'general.list');


    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

}
