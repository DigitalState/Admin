import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-role-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsRoleListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'roles';
    pageTitle = 'general.menu.identities';
    headerTitle = 'general.menu.roles';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {
        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'uuid', cellTemplate: this.textCellUuidTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
            { prop: 'createdAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
            { prop: 'updatedAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
        ];
    }
}
