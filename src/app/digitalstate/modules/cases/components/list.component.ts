import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/Rx';

// import 'style-loader!../styles/style.scss';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from '../../../models/pager';
import { Service } from '../models/service';
import { EntityApiService } from '../entity-api.service';
import { ListQuery } from '../../../models/api-query';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import { MicroserviceConfig } from '../../microservice.provider';

@Component({
    // selector: 'ds-service-list',
    templateUrl: '../templates/list.template.html'
})
export class DsCasesListComponent extends DsBaseEntityListComponent {

    // @ViewChild(DatatableComponent) datatable: DatatableComponent;
    // @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
    // @ViewChild('textCellTpl') textCellTpl: TemplateRef<any>;
    // @ViewChild('actionsTpl') actionsCellTpl: TemplateRef<any>;

    constructor(microserviceConfig: MicroserviceConfig, entityApiService: EntityApiService) {
        super(microserviceConfig);
        this.entityApiService = entityApiService;
    }

    setupList() {
        this.columns = [
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl },
            { name: 'Actions', cellTemplate: this.actionsCellTpl, headerTemplate: this.headerTpl },
        ];
    }

    /**
     * Populate the table with new data based on the page number
     * @param pager The pager to select
     */
    setPage(pageInfo) {
        // this.query.pager.pageNumber = pageInfo.offset;
        this.pager.pageNumber = pageInfo.offset;
        let m = this.entityApiService.getList(this.query);

        m.subscribe((pagedData) => {
            console.log('pagedData', pagedData);
            // this.query.pager = pagedData.pager;
            this.pager = pagedData.pager;
            this.rows = pagedData.data;
        });
    }
}
