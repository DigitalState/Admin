import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { IdentityApiService, IdentityUtils } from '../../../../shared/services/identity.service';
import { EntityApiService } from '../entity-api.service';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Link } from '../../../models/link';

@Component({
    selector: 'ds-case-show',
    templateUrl: '../templates/case-show.template.html'
})
export class DsCaseShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'cases';
    headerTitle = 'ds.microservices.entity.types.case';
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
