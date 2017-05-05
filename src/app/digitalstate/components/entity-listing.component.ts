import { Component } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/Rx';

@Component({
    selector: 'entity-listing',
    template: `
		<strong>List title goes here</strong>
		<ngx-datatable
				[rows]="rows"
				[columns]="columns">
		</ngx-datatable>
    `
})
export class EntityListing {

    entities;

    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
    ];
    columns = [
        { prop: 'uuid' },
        { prop: 'title' },
        { prop: 'form' },
        { prop: 'presentation' }
    ];

    allServices;

    constructor(private restangular: Restangular) {

    }

    ngOnInit() {
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
