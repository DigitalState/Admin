import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import 'rxjs/Rx';

// import 'style-loader!../styles/style.scss';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from '../models/pager';
import { Service } from '../models/service';
import { DsBaseEntityApiService } from '../services/base-entity-api.service';
import { ListQuery } from '../models/api-query';
import { MicroserviceConfig } from '../modules/microservice.provider';

// @Component({
//     selector: 'ds-base-entity-list',
//     templateUrl: '../templates/list.template.html'
// })
export class DsBaseEntityListComponent {

    @ViewChild(DatatableComponent) datatable: DatatableComponent;
    @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
    @ViewChild('textCellTpl') textCellTpl: TemplateRef<any>;
    @ViewChild('actionsTpl') actionsCellTpl: TemplateRef<any>;

    entityApiRoute = null;
    entities;
    rows = [];
    query: ListQuery;
    pager = new Pager();
    // rows = new Array<Service>();
    columns = [];
    allServices;
    size = 10;

    protected temp = [];

    /**
     * The Enity API service is not injected into this base component class because
     * the API service configurations are Microservice-specific.
     */
    protected entityApiService: DsBaseEntityApiService<any>;

    constructor(protected microserviceConfig: MicroserviceConfig) {

    }

    ngOnInit() {
        this.setupList();
        // this.columns = [
        //     // { prop: 'uuid', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl },
        //     {prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl},
        //     {prop: 'form', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl},
        //     {name: 'Actions', cellTemplate: this.actionsCellTpl, headerTemplate: this.headerTpl},
        // ];

        // let pager = new Pager();
        // Todo: fetch the default page size from the AppState
        this.pager.size = 3;

        // this.query = new ListQuery('services').withPager(this.pager);
        this.query = ListQuery
            .forUrl(this.microserviceConfig.settings.entrypoint.url, this.microserviceConfig.name)
            .withPager(this.pager);

        this.setPage({offset: 0});

        // this.refreshList();
    }

    /**
     * Called on subclasses to further configure the list when the component is initialized
     * within `ngOnInit`.
     */
    protected setupList() {
        throw 'Method `setupList` must be implemented by a subclass.';
    }

    protected refreshList() {
        let m = this.entityApiService.getList(this.query);

        m.subscribe((pagedData) => {
            // console.log('pagedData', pagedData);
            this.pager = pagedData.pager;
            this.rows = pagedData.data;
        });
    }

    /**
     * Update the list based on the provided filtering data.
     * This method is a callback for the observed filter-update event of the column header component.
     * @param filterData {object} This object contains the following properties:
     *        - column: The ngx-datatable column object that hosts the filter's input control.
     *        - event: The DOM event resulting from the user interaction with the control.
     */
    updateFilter(filterData) {
        const filterValue = filterData.event.target.value;
        this.query.withFilter(filterData.column.prop, filterValue);

        // Reset query to the first page before refreshing the list
        this.query.pager.pageNumber = 0; // remember page numbers are zero-based

        // Whenever the filter changes, always go back to the first page
        // this.datatable.offset = 0;

        this.refreshList();
    }

    /**
     * Populate the table with new data based on the page number
     * @param pager The pager to select
     */
    setPage(pageInfo) {
        // this.query.pager.pageNumber = pageInfo.offset;
        this.pager.pageNumber = pageInfo.offset;
        this.refreshList();
    }

}
