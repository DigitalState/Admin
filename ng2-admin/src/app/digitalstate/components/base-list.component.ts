import { AfterViewInit, Injector, TemplateRef, ViewChild } from '@angular/core';
import { Response } from '@angular/http';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import enquire from 'enquire.js';

import { FormGroup, FormBuilder } from '@angular/forms';

// import 'style-loader!../styles/style.scss';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from '../models/pager';

import { ListQuery } from '../models/api-query';
import { MicroserviceConfig } from '../../shared/providers/microservice.provider';
import { DsEntityCrudComponent } from '../../shared/components/base-entity-crud-component';

import 'rxjs/Rx';
import { Subject, Subscriber } from 'rxjs';
import { ObservableInput } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { forEach, isString, find } from 'lodash';

export class DsBaseEntityListComponent extends DsEntityCrudComponent implements AfterViewInit {

    @ViewChild(DatatableComponent) datatable: DatatableComponent;
    @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
    @ViewChild('textCellTpl') textCellTpl: TemplateRef<any>;
    @ViewChild('textCellUuidTpl') textCellUuidTpl: TemplateRef<any>;
    @ViewChild('actionsTpl') actionsCellTpl: TemplateRef<any>;

    rows = [];
    columns = [];
    sorts = [];
    query: ListQuery;
    pager = new Pager();

    customFiltersForm: FormGroup;
    customFiltersFormChangeSubscription: Subscription;
    showCustomFilters: boolean = false;

    formBuilder: FormBuilder;

    // progress bar bindings
    loading: boolean;

    // Todo: fetch the default page size from the AppState
    size = 10;

    /**
     * Static Datatable attributes
     * @type {object}
     */
    datatableAttributes = {
        columnMode: 'force',
        rowHeight: 'auto',
        headerHeight: 100, // overridden in list components that don't have column filters
        footerHeight: 50,
        externalPaging: true,
        externalSorting: true,
    };

    /**
     * Descriptor of header action buttons
     * @type  Array<object>
     */
    headerActions: Array<any> = [
        {
            name: 'create',
            title: 'ds.microservices.entity.action.create',
            class: 'btn btn-primary btn-with-icon',
            iconClass: 'ion-android-add-circle',
            visible: true,
            routerLink: ['../create'],
        },
        {
            name: 'refresh',
            title: 'ds.microservices.entity.action.refresh',
            class: 'btn btn-secondary btn-with-icon',
            iconClass: 'ion-android-refresh',
            visible: true,
        },
    ];

    /**
     * Descriptor of row action buttons in the grid.
     * @type  Array<object>
     */
    actions: Array<any> = [
        {
            name: 'show',
            title: 'ds.microservices.entity.action.show',
            class: 'btn btn-default btn-with-icon',
            iconClass: 'ion-eye',
            visible: true,
        },
        {
            name: 'edit',
            title: 'ds.microservices.entity.action.edit',
            class: 'btn btn-default btn-with-icon',
            iconClass: 'ion-edit',
            visible: true,
        },
    ];

    // actions: { [s: string]: boolean } = {
    //     show: true,
    //     refresh: true,
    //     create: true,
    //     edit: true,
    // };

    /**
     * The parent entity object (if any). This applies when the subclassing component targets
     * an entity that is at the `many` end of a one-to-many relationship with the parent entity.
     */
    protected entityParent: any;

    /**
     * The URL portion of the REST resource URL that refers to the entity's collection.
     * @type {string}
     */
    protected entityUrlPrefix: string;

    /**
     * Filtering model and stream
     */
    protected filters = {};
    protected filterStream = new Subject<any>();

    /**
     * A shortcut to the entity's metadata from the MicroserviceConfig.
     */
    protected entityMetadata = {};

    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    /**
     * Interface language holder.
     */
    lang: string;

    /**
     * EnquireJS media queries and their handlers in key/value format.
     */
    protected mediaQueryHandlers = {};

    /**
     * Holds the toastr promise to avoid queueing multiple toasts for the same error.
     */
    protected listRefershErrorToastrPromise: any;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(injector: Injector,
                protected microserviceConfig: MicroserviceConfig) {
        super(injector);
        this.formBuilder = injector.get(FormBuilder);
    }

    ngOnInit() {
        super.ngOnInit();

        this.lang = this.translate.currentLang;

        // Subscribe to language-change events
        this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.lang = event.lang;
            this.updateTranslations(event.lang);
            this.refreshList();
        });

        this.entityMetadata = this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties;
        this.pager.size = this.size;

        // UI lifecycle
        this.setupUi();
        this.setupList();
        this.postSetupList();

        this.setupQuery();

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

        // Push breadcrumb
        this.pageBreadcrumbData.title = this.headerTitle;
        this.pageBreadcrumbData.tags = ['crud-list'];
    }

    ngOnDestroy() {
        // Unsubscribe from observables
        if (this.languageChangeSubscriber) {
            this.languageChangeSubscriber.unsubscribe();
        }

        if (this.customFiltersFormChangeSubscription) {
            this.customFiltersFormChangeSubscription.unsubscribe();
        }

        this.destroyUi();
    }

    ngAfterViewInit() {
        this.commitBreadcrumb();
    }

    /**
     * Initialize and build the remote service query. Subclasses can use this to further configure the query object.
     */
    protected setupQuery(): void {
        this.query = ListQuery
            .forUrl(this.microserviceConfig.settings.entrypoint.url, this.entityUrlPrefix)
            .withPager(this.pager);
    }

    /**
     * Setup the UI.
     * This can be overridden by subclasses to further configure the UI.
     */
    protected setupUi() {
        this.setupMediaQueries();
        this.setupCustomFilters();

        forEach(this.datatableAttributes, (value, key) => {
            this.datatable[key] = value;
        });
    }

    /**
     * This is a lifecycle method that is called from ngOnDestroy so custom/third-party UI
     * event listeners can be terminated.
     */
    protected destroyUi() {
        // Unregister media query handlers by unregistering the query condition
        forEach(this.mediaQueryHandlers, (value, key) => {
            enquire.unregister(key);
        });
    }

    protected setupMediaQueries() {
        let config: any = this.appState.get('config');
        let datatable = this.datatable;

        this.mediaQueryHandlers[config.mediaQueryAliases.small] = {
            /** Triggered when a media query matches */
            match : function() {
                // datatable.scrollbarH = true;
            },

            /** Triggered when the media query transitions from a matched state to an unmatched state */
            unmatch : function() {
                // datatable.scrollbarH = false;
            },

            /** Triggered as soon as this handler is registered */
            setup : function() {
                // Due to a bug in ngx-datatable that occurs when the scrollbars are enabled after initializing
                // the datatable instance, we are going to activate the scrollbar anyway
                datatable.scrollbarH = true;
            },

            /** Triggered when handler is unregistered. Place cleanup code here */
            destroy : function() {}
        };

        forEach(this.mediaQueryHandlers, (value, key) => {
            enquire.register(key, value);
        });
    }

    /**
     * Create an empty Custom Filters form by default.
     */
    protected setupCustomFilters() {
       this.customFiltersForm = this.formBuilder.group({});
    }

    /**
     * Called on subclasses to configure the Data-table columns when the component is initialized
     */
    protected setupList() {}

    /**
     * Perform additional configurations on the Data-table settings after subcalsses complete their
     * own configurations in `setupList`;
     */
    protected postSetupList() {
        this.columns.forEach((column) => {
            column.propertyMetadata = this.entityMetadata[column.prop];
        });

        // Append the Actions column
        this.columns.push(
            { id: 'actions', name: 'actions', label: 'ds.microservices.entity.action.actions', cellTemplate: this.actionsCellTpl, headerTemplate: this.headerTpl, sortable: false }
        );

        this.updateTranslations(this.translate.currentLang);
    }

    /**
     * Fetch the list using the Entity API Service.
     */
    protected refreshList() {
        this.loading = true;
        let list = this.entityApiService.getList(this.query);

        list.subscribe((pagedData) => {
            this.pager = pagedData.pager;
            this.rows = this.preprocessRowsData(pagedData.data);
            this.loading = false;
        }, error => {
            if (error instanceof Response) {
                this.handleListRefreshError(error);
            } else {
                console.error('Unexpected error occurred while fetching list: ', error);
            }
            this.loading = false;
        });
    }

    protected handleListRefreshError(response: Response): void {
        if (this.listRefershErrorToastrPromise) {
            return;
        }

        const title = this.translate.instant('ds.messages.http.' + response.status);
        const data = response.json()
        const message = (data && data.error) ? data.error : '';
        this.listRefershErrorToastrPromise = this.toastr.error(message, title, {
            'dismiss': 'click'
        });
    }

    /**
     * Handle header actions.
     * By default this method attempts to use the routerLink (if any) in the action and navigate to it.
     * @param event { action: object }
     */
    protected handleHeaderEvent(event: any) {
        let relativePath = this.entityParentUrlPrefix
            ? '../' + this.entityUrlPrefix
            : '../';

        switch (event.action.name) {
            case 'refresh':
                this.refreshList();
                break;
            case 'create':
                this.router.navigate([relativePath, 'create'], { relativeTo: this.route });
                break;
            default:
                if (event.action.routerLink) {
                    this.router.navigate(event.action.routerLink, { relativeTo: this.route });
                }
                break;
        }
    }

    /**
     * Handle row actions.
     * By default this method assumes certain navigational routes for `show` and `edit` in relation to the current page
     * in which the grid is being displayed.
     * @param event { row: object, action: object } This contains data of the row and action that triggered the event.
     */
    protected handleRowEvent(event: any) {
        let relativePath = this.entityParentUrlPrefix
            ? '../' + this.entityUrlPrefix
            : '../';

        switch (event.action.name) {
            case 'show':
                this.router.navigate([relativePath, event.row.uuid, 'show'], { relativeTo: this.route });
                break;
            case 'edit':
                this.router.navigate([relativePath, event.row.uuid, 'edit'], { relativeTo: this.route });
                break;
            default:
                break;
        }
    }

    /**
     * Preprocess fetched data.
     * By default this appends actions visibility settings to each row.
     *
     * @param fetchedData
     * @returns {any}
     */
    protected preprocessRowsData(fetchedData): Array<any> {
        // Add metadata container including list actions
        let rows;
        if (fetchedData) {
            rows = fetchedData.map((row) => {
                row['_'] = {
                    'actions': this.actions
                };
                return row;
            });
        }

        return rows;
    }

    /**
     * A callback for the observed `onFilterUpdate` event of the column header component.
     * This method queues the received filtering updates into the observable filter stream.
     * @param filterData {object} This object contains the following properties:
     *        - column: The ngx-datatable column object that hosts the filter's input control.
     *        - event: The DOM event resulting from the user interaction with the control.
     */
    protected onFilterValueChange(filterData) {
        const filterProperty = filterData.column.hasOwnProperty('filterProp') ? filterData.column.filterProp : filterData.column.prop;
        const filterValue = filterData.event.target.value;
        this.filterStream.next({ filterProperty, filterValue });
    }

    /**
     * Update the filtering model using the provided filter value.
     * @param obj Property and value of the filter
     * @returns {any} obj as received from the stream
     */
    protected assignFilterValue(obj): ObservableInput<any> {
        console.log('assignFilterValue: ', obj);
        this.filters[obj.filterProperty] = obj.filterValue;
        return obj;
    }

    /**
     * This is the subscriber to the filter stream that actually refreshes the list
     */
    protected doFilter() {
        Object.keys(this.filters).forEach((filterProperty) => {
            const filterValue = this.filters[filterProperty];
            if (filterValue == null || (isString(filterValue) && filterValue.length === 0)) {
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
    protected setPage(pageInfo) {
        // this.query.pager.pageNumber = pageInfo.offset;
        this.pager.pageNumber = pageInfo.offset;
        this.refreshList();
    }

    /**
     *
     * @param {object} sortEvent The sort event object provided by ngx-datatable. It looks as follows:
     *  {
     *      column: Object, // The sort-target column
     *      prevValue: "asc" | "desc" | undefined,
     *      newValue: "asc" | "desc"
     *  }
     */
    protected onSort(sortEvent: {column: any, prevValue: string, newValue: string}) {
        console.log('base-list.component::onSort', sortEvent);
        if (sortEvent.column.prop) {
            this.query.unsetOrder();
            this.query.setOrder(sortEvent.column.prop, sortEvent.newValue);
            this.refreshList();
        }
    }

    /**
     * Event handler for Datatable row activation when A cell or row is focused
     * via keyboard or mouse click.
     *
     * This handler emulates the `show` event for the activated row.
     *
     * @param event:
     * {
     *      type: 'keydown'|'click'|'dblclick'
     *      event
     *      row
     *      column
     *      value
     *      cellElement
     *      rowElement
     * }
     */
    protected onRowActivation(event) {
        // Do not trigger the event if the activation source is the `Actions` column
        // since this will interfere with the dropdown and the action buttons
        if (event.column.id !== 'actions') {
            const rowEvent = {
                'action': find(this.actions, { 'name': 'show' }),
                'row': event.row
            };

            this.handleRowEvent(rowEvent);
        }
    }

    /**
     * Dynamically update localized strings that are not rendered through the `translate` pipe.
     * This mainly applies to the ngx-datatable component.
     */
    protected updateTranslations(newLang: string): void {
        // Update the localization strings of ngx-datatable
        this.datatable.messages = this.translate.instant('datatable');

        // Update the columns' headers
        this.columns.forEach((column) => {
            // For translation, use the column name if available; otherwise, construct the translation string
            // from the column `prop` value
            let columnLabel = column.label ? column.label : 'ds.microservices.entity.property.' + column.prop;
            this.translate.get(columnLabel).subscribe((translatedString) => {
                column.name = translatedString;
            });
        });

    }
}
