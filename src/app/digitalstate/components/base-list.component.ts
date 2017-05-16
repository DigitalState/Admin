import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';

// import 'style-loader!../styles/style.scss';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from '../models/pager';
import { Service } from '../models/service';
import { DsBaseEntityApiService } from '../services/base-entity-api.service';
import { ListQuery } from '../models/api-query';
import { MicroserviceConfig } from '../modules/microservice.provider';
import { Subject } from 'rxjs';
import { ObservableInput } from 'rxjs/Observable';
import 'rxjs/Rx';

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
    size = 10;

    /**
     * Static Datatable attributes
     * @type {object}
     */
    datatableAttributes = {
        columnMode: 'force',
        rowHeight: 'auto',
        headerHeight: 90,
        footerHeight: 50,
        externalPaging: true,
    };

    protected filterModel: Map<string, Subject<string>> = new Map();

    protected filters = {};
    protected filterStream = new Subject<any>();

    /**
     * The Enity API service is not injected into this base component class because
     * the API service configurations are Microservice-specific.
     */
    protected entityApiService: DsBaseEntityApiService<any>;

    constructor(protected microserviceConfig: MicroserviceConfig) {

    }

    ngOnInit() {
        this.setupUi();
        this.setupList();
        this.postSetupList();

        // Todo: fetch the default page size from the AppState
        this.pager.size = 3;

        this.query = ListQuery
            .forUrl(this.microserviceConfig.settings.entrypoint.url, this.microserviceConfig.name)
            .withPager(this.pager);

        // Configure the column-filtering stream
        this.filterStream
            .distinctUntilChanged(
                // distinct comparer: check whether both filter property and value are identical
                (obj1, obj2) => (obj1.filterProperty === obj2.filterProperty && obj1.filterValue === obj2.filterValue)
            )
            .map((obj) => this.assignFilterValue(obj))
            .debounceTime(500)
            .subscribe(() => this.doFilter());

        // Run the initial fetch query
        this.setPage({offset: 0});
    }

    /**
     * Setup the UI.
     * This can be overridden by subclasses to further configure the UI.
     */
    protected setupUi() {
        _.forEach(this.datatableAttributes, (value, key) => {
            console.log(key, value);
            this.datatable[key] = value;
        });
    }

    /**
     * Called on subclasses to configure the Data-table columns when the component is initialized
     */
    protected setupList() {

    }

    /**
     * Perform additional configurations on the Data-table settings after subcalsses complete their
     * own configurations in `setupList`;
     */
    protected postSetupList() {
        // Append the Actions column
        this.columns.push(
            { name: 'Actions', cellTemplate: this.actionsCellTpl, headerTemplate: this.headerTpl },
        );
    }

    /**
     * Fetch the list using the Entity API Service.
     */
    protected refreshList() {
        let m = this.entityApiService.getList(this.query);

        m.subscribe((pagedData) => {
            this.pager = pagedData.pager;
            this.rows = pagedData.data;
        });
    }

    /**
     * A callback for the observed `onFilterUpdate` event of the column header component.
     * This method queues the received filtering updates into the observable filter stream.
     * @param filterData {object} This object contains the following properties:
     *        - column: The ngx-datatable column object that hosts the filter's input control.
     *        - event: The DOM event resulting from the user interaction with the control.
     */
    onFilterValueChange(filterData) {
        const filterProperty = filterData.column.prop;
        const filterValue = filterData.event.target.value;
        this.filterStream.next({ filterProperty, filterValue });
    }

    // assignFilterValue(prop, val): ObservableInput<any> {
    protected assignFilterValue(obj): ObservableInput<any> {
        console.log('assignFilterValue: ', obj);
        this.filters[obj.filterProperty] = obj.filterValue;
    }

    /**
     * This is the subscriber to the filter stream that actually refreshes the list
     */
    protected doFilter() {
        Object.keys(this.filters).forEach((filterProperty) => {
            const filterValue = this.filters[filterProperty];
            if (filterValue == null || (_.isString(filterValue) && filterValue.length === 0)) {
                delete this.filters[filterProperty];
                this.query.unsetFilter(filterProperty);
            }
            else
            {
                this.filters[filterProperty] = filterValue;
                this.query.setFilter(filterProperty, this.filters[filterProperty]);
            }
        });

        console.log(this.filters);

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
