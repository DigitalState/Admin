import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { IdentityUtils } from '../../../../shared/utils/identity.utils';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';

@Component({
    selector: 'ds-identity-create',
    templateUrl: '../templates/identity-form.template.html'
})
export class DsIdentityCreateComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'identities';
    pageTitle = 'general.menu.identities';
    backLink = new Link(['../list'], 'general.list');
    isNew = true;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }
}

@Component({
    selector: 'ds-business-unit-create',
    templateUrl: '../templates/business-unit-form.template.html'
})
export class DsBusinessUnitCreateComponent extends DsIdentityCreateComponent {

    entityUrlPrefix = 'business-units';
    personaUrlPrefix = IdentityUtils.getPersonaUrlPrefix('BusinessUnit');
    headerTitle = 'ds.microservices.entity.types.businessUnit';
    isNew = true;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-organization-create',
    templateUrl: '../templates/identity-form.template.html'
})
export class DsOrganizationCreateComponent extends DsIdentityCreateComponent {

    entityUrlPrefix = 'organizations';
    personaUrlPrefix = IdentityUtils.getPersonaUrlPrefix('Organization');
    headerTitle = 'ds.microservices.entity.types.organization';
    isNew = true;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-individual-create',
    templateUrl: '../templates/identity-form.template.html'
})
export class DsIndividualCreateComponent extends DsIdentityCreateComponent {

    entityUrlPrefix = 'individuals';
    personaUrlPrefix = IdentityUtils.getPersonaUrlPrefix('Individual');
    headerTitle = 'ds.microservices.entity.types.individual';
    isNew = true;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-staff-create',
    templateUrl: '../templates/identity-form.template.html'
})
export class DsStaffCreateComponent extends DsIdentityCreateComponent {

    entityUrlPrefix = 'staffs';
    headerTitle = 'ds.microservices.entity.types.staff';
    isNew = true;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-anonymous-create',
    templateUrl: '../templates/identity-form.template.html'
})
export class DsAnonymousCreateComponent extends DsIdentityCreateComponent {

    entityUrlPrefix = 'anonymouses';
    headerTitle = 'ds.microservices.entity.types.anonymous';
    isNew = true;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}