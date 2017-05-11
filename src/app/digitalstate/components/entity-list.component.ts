import { Component, Inject, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/Rx';

// import 'style-loader!../styles/style.scss';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Pager } from '../models/pager';
import { Service } from '../models/service';
import { DsBaseEntityApiService } from '../services/base-entity-api.service';
import { ListQuery } from '../models/api-query';
import { MicroserviceConfig, MICROSERVICE_RESTANGULAR } from '../modules/microservice.provider';
import { TemplateStorage } from '../services/template-storage.service';

@Component({
    selector: 'ds-entity-list',
    templateUrl: '../templates/list.template.html'
})
export class DsEntityListComponent {

    @ContentChild(DatatableComponent) datatable: DatatableComponent;

    constructor() {

    }

    ngOnInit() {

    }

    // ngAfterViewInit() {}

    protected refreshList() {

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
}
