import { Component } from '@angular/core';
import 'rxjs/Rx';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import { MicroserviceConfig } from '../../microservice.provider';

@Component({
    selector: 'ds-service-list',
    templateUrl: '../templates/list.template.html'
})
export class DsServiceListComponent extends DsBaseEntityListComponent {

    constructor(microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {
        super(microserviceConfig);
        this.entityApiService = entityApiService;
    }

    setupList() {
        this.columns = [
            // { prop: 'uuid', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl },
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
            { prop: 'form', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
            { name: 'Actions', cellTemplate: this.actionsCellTpl, headerTemplate: this.headerTpl },
        ];
    }
}
