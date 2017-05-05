import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/Rx';

import 'style-loader!../styles/style.scss';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
    selector: 'ds-service-list',
    templateUrl: '../templates/list.template.html',
    styleUrls: [
        '../styles/ngx-datatable.scss',
        // '../../styles/ngx-datatable/index.css',
        // '../../styles/ngx-datatable/material.css',
        // '../../styles/ngx-datatable/icons.css'
    ]
})
export class DsServiceListComponent {

    @ViewChild(DatatableComponent) datatable: DatatableComponent;
    @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
    @ViewChild('textCellTpl') textCellTpl: TemplateRef<any>;
    @ViewChild('actionsTpl') actionsCellTpl: TemplateRef<any>;

    entityApiRoute = 'services';
    entities;
    rows = [];
    columns = [];
    allServices;

    private temp = [];

    constructor(private restangular: Restangular) {

    }

    ngOnInit() {
        this.columns = [
            // { prop: 'uuid', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl },
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl },
            { prop: 'form', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl },
            { name: 'Actions', cellTemplate: this.actionsCellTpl, headerTemplate: this.headerTpl },
        ];

        this.refreshList();
    }

    refreshList() {
        this.restangular.all('services').getList().subscribe(services => {
            this.allServices = services;
            this.temp = [...services];
            this.rows = services;
            console.log('Fetched services: ', services);
        });
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
}
