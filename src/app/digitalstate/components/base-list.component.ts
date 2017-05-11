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
    protected entityApiService: DsBaseEntityApiService;

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
        console.log(this.datatable);
    }

    /**
     * Client-side filtering
     * @param event
     */
    updateFilter(event) {
        console.log('Updating filter with event:', event);
        const val = event.target.value.toLowerCase();

        // filter our data
        // Todo: this is part of the demo and has properties that are specific to the Service entity
        // Todo: generalize this code below
        const temp = this.temp.filter(function (d) {
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
