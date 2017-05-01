import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/Rx';

import 'style-loader!../styles/buttons.scss';

@Component({
    selector: 'ds-service-list',
    templateUrl: '../templates/list.template.html',
})
export class DsServiceListComponent {

    @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
    @ViewChild('textCellTpl') textCellTpl: TemplateRef<any>;
    @ViewChild('actionsTpl') actionsCellTpl: TemplateRef<any>;

    entityApiRoute = 'services';
    entities;
    rows = [];
    columns = [];
    allServices;

    constructor(private restangular: Restangular) {

    }

    ngOnInit() {
        this.columns = [
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl },
            { name: 'Actions', cellTemplate: this.actionsCellTpl, headerTemplate: this.headerTpl },
        ];

        let servicesCollection = this.restangular.all('services');
        let serviceRequest = this.restangular.one('services', 'ed492b25-c164-4401-b9ed-105ef544b926');

        // servicesCollection.getList().then(function(response) {
        //     console.log('response:', response);
        // }).catch(function(error) {
        //     console.log(error);
        // });

        servicesCollection.getList().subscribe(services => {
            this.allServices = services;
            this.rows = services;
            console.log('Fetched services: ', services);
        });

        serviceRequest.get().subscribe(service => {
            console.log('Fetched service: ', service);
        });
    }
}
