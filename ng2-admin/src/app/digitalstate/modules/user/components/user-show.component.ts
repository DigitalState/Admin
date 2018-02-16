import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { IdentityApiService } from '../../../../shared/services/identity.service';
import { IdentityUtils } from '../../../../shared/utils/identity.utils';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { LocalApiUtils } from '../../../utils/local-api.utils';


@Component({
    selector: 'ds-user-show',
    templateUrl: '../templates/user-show.template.html'
})
export class DsUserShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'users';
    pageTitle = 'general.menu.users';
    headerTitle = 'ds.microservices.entity.types.user';
    backLink = new Link(['../../list'], 'general.list');
    identityLink: any;

    personas: Array<any>;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService,
                protected identityApiService: IdentityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;
            this.identityLink = LocalApiUtils.createIdentityEntityLink(entity.identity, entity.identityUuid);
            this.loadPersonas();
            return Observable.of({'entity': entity, 'entityParent': prepared.entityParent});
        });
    }

    loadPersonas() {
        const entityUrlPrefix = IdentityUtils.getPersonaUrlPrefix(this.entity.identity);
        const identitySingular = IdentityUtils.getSingular(this.entity.identity);
        const requestParams = {};

        requestParams[ identitySingular + '.uuid' ] = this.entity.identityUuid;

        this.identityApiService.resource(entityUrlPrefix).getList(requestParams).subscribe((personas: Array<any>) => {
            this.personas = personas;
        });
    }
}
