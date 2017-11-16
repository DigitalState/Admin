import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsServiceListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'services';
    pageTitle = 'general.menu.serviceDirectory';
    headerTitle = 'general.menu.services';

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
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'presentation', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
        ];
    }
}
