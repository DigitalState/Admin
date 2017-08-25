import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';

import 'rxjs/Rx';

@Component({
    selector: 'ds-submission-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsSubmissionListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'submissions';
    pageTitle = 'general.menu.serviceDirectory';
    headerTitle = 'general.menu.submissions';
    headerSubtitle = '';

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }


    ngOnInit(): any {
        this.datatableAttributes.headerHeight = 45;

        // this.actions.refresh = false;
        // this.actions.create = false;
        // this.actions.edit = false;

        this.headerActions = this.headerActions.map((action: any) => {
            switch (action.name) {
                case 'create':
                    action.visible = false;
                    break;
            }

            return action;
        });

        this.actions = this.actions.map((action: any) => {
            switch (action.name) {
                case 'edit':
                    action.visible = false;
                    break;
            }

            return action;
        });

        return super.ngOnInit();
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'uuid', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: false, sortable: false },
            { prop: 'updatedAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
        ];
    }

    protected setupQuery(): void {
        super.setupQuery();
        this.query.setFilter('order[updatedAt]', 'desc');
    }
}
