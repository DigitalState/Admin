import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { IdentityUtils } from '../../../../shared/utils/identity.utils';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-identity-edit',
    templateUrl: '../templates/identity-form.template.html'
})
export class DsIdentityEditComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'identities';
    pageTitle = 'general.menu.identities';
    backLink = new Link(['../../list'], 'general.list');
    isNew = false;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    /**
     * @Todo Refactor the entity assignment behavior below to the parent `prepareEntity()` method.
     * @return {Observable<R>}
     */
    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            this.entity = prepared.entity
            return Observable.of({'entity': this.entity });
        });
    }
}

@Component({
    selector: 'ds-business-unit-edit',
    templateUrl: '../templates/business-unit-form.template.html'
})
export class DsBusinessUnitEditComponent extends DsIdentityEditComponent {

    entityUrlPrefix = 'business-units';
    headerTitle = 'ds.microservices.entity.types.businessUnit';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-organization-edit',
    templateUrl: '../templates/identity-form.template.html'
})
export class DsOrganizationEditComponent extends DsIdentityEditComponent {

    entityUrlPrefix = 'organizations';
    headerTitle = 'ds.microservices.entity.types.organization';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-individual-edit',
    templateUrl: '../templates/identity-form.template.html'
})
export class DsIndividualEditComponent extends DsIdentityEditComponent {

    entityUrlPrefix = 'individuals';
    headerTitle = 'ds.microservices.entity.types.individual';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-staff-edit',
    templateUrl: '../templates/identity-form.template.html'
})
export class DsStaffEditComponent extends DsIdentityEditComponent {

    entityUrlPrefix = 'staffs';
    headerTitle = 'ds.microservices.entity.types.staff';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-staff-edit',
    templateUrl: '../templates/identity-form.template.html'
})
export class DsAnonymousEditComponent extends DsIdentityEditComponent {

    entityUrlPrefix = 'anonymouses';
    headerTitle = 'ds.microservices.entity.types.anonymous';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}