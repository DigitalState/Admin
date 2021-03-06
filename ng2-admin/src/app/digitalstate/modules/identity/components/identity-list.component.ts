import { Component, Injector } from '@angular/core';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import 'rxjs/Rx';

@Component({
    selector: 'ds-identity-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsIdentityListComponent extends DsBaseEntityListComponent {

    pageTitle = 'general.menu.identities';

    constructor(injector: Injector, microserviceConfig: MicroserviceConfig, entityApiService: EntityApiService) {
        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'uuid', cellTemplate: this.textCellUuidTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'createdAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
        ];
    }

    protected setupQuery(): void {
        super.setupQuery();
        this.query.setFilter('order[createdAt]', 'desc');
    }
}

@Component({
    selector: 'ds-business-unit-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsBusinessUnitListComponent extends DsIdentityListComponent {

    entityUrlPrefix = 'business-units';
    headerTitle = 'general.menu.businessUnits';

    constructor(injector: Injector, microserviceConfig: MicroserviceConfig, entityApiService: EntityApiService) {
        super(injector, microserviceConfig, entityApiService);
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'uuid', cellTemplate: this.textCellUuidTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'createdAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
        ];
    }
}

@Component({
    selector: 'ds-organization-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsOrganizationListComponent extends DsIdentityListComponent {

    entityUrlPrefix = 'organizations';
    headerTitle = 'general.menu.organizations';

    constructor(injector: Injector, microserviceConfig: MicroserviceConfig, entityApiService: EntityApiService) {
        super(injector, microserviceConfig, entityApiService);
    }

}

@Component({
    selector: 'ds-individual-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsIndividualListComponent extends DsIdentityListComponent {

    entityUrlPrefix = 'individuals';
    headerTitle = 'general.menu.individuals';

    constructor(injector: Injector, microserviceConfig: MicroserviceConfig, entityApiService: EntityApiService) {
        super(injector, microserviceConfig, entityApiService);
    }

}

@Component({
    selector: 'ds-staff-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsStaffListComponent extends DsIdentityListComponent {

    entityUrlPrefix = 'staffs';
    headerTitle = 'general.menu.staffs';

    constructor(injector: Injector, microserviceConfig: MicroserviceConfig, entityApiService: EntityApiService) {
        super(injector, microserviceConfig, entityApiService);
    }

}

@Component({
    selector: 'ds-anonymous-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsAnonymousListComponent extends DsIdentityListComponent {

    entityUrlPrefix = 'anonymouses';
    headerTitle = 'general.menu.anonymouses';

    constructor(injector: Injector, microserviceConfig: MicroserviceConfig, entityApiService: EntityApiService) {
        super(injector, microserviceConfig, entityApiService);
    }

}