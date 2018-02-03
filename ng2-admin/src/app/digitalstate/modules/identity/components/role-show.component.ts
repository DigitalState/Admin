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

    identityPersonaEntity: any;
    ownerEntity: any;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService,
                protected identityApiService: IdentityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;

            let ownerResource = this.identityApiService.oneByType(entity.owner, entity.ownerUuid);
            ownerResource.get().subscribe(ownerEntity => {
                this.ownerEntity = ownerEntity;
            }, () => {
                console.log('Unable to fetch Role owner', entity.owner, entity.ownerUuid);
            });

            this.identityApiService.getPersonas(entity.identity, entity.identityUuid).subscribe(personas => {
                if (personas && personas.length > 0) {
                    this.identityPersonaEntity = personas[0];
                }
            });

            return Observable.of({'entity': entity});
        });
    }
}
