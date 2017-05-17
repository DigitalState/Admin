import { Component } from '@angular/core';
import 'rxjs/Rx';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import { MicroserviceConfig } from '../../microservice.provider';

@Component({
    selector: 'ds-interaction-list',
    templateUrl: '../templates/interaction-list.template.html'
})
export class DsInteractionListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'interactions';

    constructor(microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {
        super(microserviceConfig);
        this.entityApiService = entityApiService;
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
            { prop: 'channel', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
        ];
    }
}
