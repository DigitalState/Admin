import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';

import 'rxjs/Rx';

@Component({
    selector: 'ds-file-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsFileListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'files';
    pageTitle = 'general.menu.cms';
    headerTitle = 'general.menu.files';

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
            { prop: 'slug', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'createdAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
        ];
    }

    protected setupQuery(): void {
        super.setupQuery();
        this.query.setFilter('order[createdAt]', 'desc');
    }
}
