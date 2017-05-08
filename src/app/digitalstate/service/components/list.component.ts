import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/Rx';

// import 'style-loader!../styles/style.scss';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from '../../models/pager';
import { Service } from '../models/service';
import { EntityApiService } from '../entity-api.service';
import {ListQuery} from '../../models/api-query';
import {List} from 'lodash';

@Component({
    selector: 'ds-service-list',
    templateUrl: '../templates/list.template.html'
})
export class DsServiceListComponent {

    @ViewChild(DatatableComponent) datatable: DatatableComponent;
    @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
    @ViewChild('textCellTpl') textCellTpl: TemplateRef<any>;
    @ViewChild('actionsTpl') actionsCellTpl: TemplateRef<any>;

    entityApiRoute = 'services';
    entities;
    rows = [];
    query: ListQuery;
    pager = new Pager();
    // rows = new Array<Service>();
    columns = [];
    allServices;
    size = 10;

    private temp = [];

    constructor(private restangular: Restangular,
                private entityApiService: EntityApiService) {

    }

    ngOnInit() {
        this.columns = [
            // { prop: 'uuid', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl },
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl },
            { prop: 'form', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl },
            { name: 'Actions', cellTemplate: this.actionsCellTpl, headerTemplate: this.headerTpl },
        ];

        // let pager = new Pager();
        this.pager.size = 3;

        this.query = new ListQuery('services').withPager(this.pager);
        this.setPage({ offset: 0 });

        // this.refreshList();
    }

    refreshList() {
        console.log(this.datatable);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.title.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.datatable.offset = 0;
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
