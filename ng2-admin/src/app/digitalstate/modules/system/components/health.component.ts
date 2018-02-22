import { Component, Injector } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { AuthService } from "../../../../shared/modules/auth/auth.service";
import { DsPageComponent } from '../../../../shared/components/page-component';

import { AppState } from '../../../../app.service';

import forEach from 'lodash/forEach';
import sortBy from 'lodash/sortBy';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-health',
    templateUrl: '../templates/health.template.html',
    styleUrls: ['../styles/health.scss'],
})
export class DsHealthComponent extends DsPageComponent {

    protected pageTitle = 'general.menu.healthCheck';
    protected statusesNames: Array<string> = []; // Sample: ['ping', 'database.connection']

    protected microservicesStatuses: Array<MicroserviceStatus> = [
        // { name: 'ServiceA', isHealthy: true, timestamp: '2017-11-01T13:22:16-04:00', itemsStatuses: { 'ping': { isHealthy: true, timestamp: '2017-11-01T13:22:16-04:00' }, 'database.connection': { isHealthy: true, timestamp: '2017-11-01T13:22:16-04:00' } } },
        // { name: 'ServiceB', isHealthy: false, timestamp: '2017-11-01T13:22:16-04:00', itemsStatuses: { 'ping': { isHealthy: true, timestamp: '2017-11-01T13:22:16-04:00' }, 'database.connection': { isHealthy: false, timestamp: '2017-11-01T13:22:16-04:00' } } },
        // { name: 'ServiceC', isHealthy: true, timestamp: '2017-11-01T13:22:16-04:00', itemsStatuses: { 'ping': { isHealthy: false, timestamp: '2017-11-01T13:22:16-04:00' }, 'database.connection': { isHealthy: true, timestamp: '2017-11-01T13:22:16-04:00' } } },
    ];

    protected responsesObservables: Array<Observable<any>> = [];


    constructor(protected injector: Injector,
                protected http: Http,
                protected appState: AppState,
                protected auth: AuthService) {

        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        this.commitBreadcrumb();

        // Gather http requests to health endpoints for each microservice from the metadata config
        forEach(this.appState.get('microservices'), (msConfig: any, msName: string) => {
            if (msConfig.entrypoint && msConfig.entrypoint.url) {
                const response = this.requestHealthStatus(msName, msConfig.entrypoint.url + 'health');
                this.responsesObservables.push(response);
            }
        });

        this.runRequests();
    }

    /**
     * Run all HTTP request observables to populate the health grid.
     */
    runRequests() {
        // First we clear the array to avoid duplicates
        this.microservicesStatuses = [];

        // Run all the requests in parallel and subscribe to the final result of all responses
        Observable.forkJoin(this.responsesObservables).subscribe((responses: Array<any>) => {
            // Sort the list of microservicesStatuses alphabetically
            this.microservicesStatuses = sortBy(this.microservicesStatuses, 'name');
        });
    }

    /**
     * Request health data from a single microservice and populate the microservicesStatuses model accordingly.
     * @param msName
     * @param msUrl
     * @return Observable<any>
     */
    requestHealthStatus(msName: string, msUrl: any): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.auth.getToken()}`,
        });

        let requestOptions = new RequestOptions({
            headers: headers,
        });

        return this.http.get(msUrl, requestOptions)
            .map((response: Response) => {
                let json: any = response.json();
                json.name = msName;
                return json;
            })
            .flatMap((healthResult: any) => {
                this.handleHealthSuccessResponse(msName, healthResult);
                return Observable.of(healthResult);
            }).catch((error: Response) => {
                this.handleHealthErrorResponse(msName, error);
                return Observable.of(error);
            });
    }

    /**
     * Upon a successful check of a microservice's health, create an object out of the received data and add it
     * to the `microservicesStatuses` model.
     * @param msName
     * @param healthResult
     */
    handleHealthSuccessResponse(msName: string, healthResult: any): void {
        let msStatus: MicroserviceStatus = {
            name: msName,
            isHealthy: healthResult.healthy,
            timestamp: healthResult.timestamp,
            itemsStatuses: {}
        };

        forEach(healthResult.statuses, (item, itemName) => {
            // If the item name does not exist in the statuses names add it
            if (this.statusesNames.indexOf(itemName) < 0) {
                this.statusesNames.push(itemName);
            }

            msStatus.itemsStatuses[itemName] = {
                isHealthy: item.healthy,
                timestamp: item.timestamp,
            } as ItemStatus;
        });

        this.microservicesStatuses.push(msStatus);
    }

    /**
     * If an error occurs while checking the health of a microservice, add it anyway with empty properties.
     * @param msName
     * @param error
     */
    handleHealthErrorResponse(msName: string, error): void {
        console.warn(`Error while requesting health status of (${msName})`, error);
        let msStatus: MicroserviceStatus = {
            name: msName,
            isHealthy: null,
            timestamp: null,
            itemsStatuses: {}
        };

        this.microservicesStatuses.push(msStatus);
    }
}

/**
 * Microservice Status model
 */
interface MicroserviceStatus {
    name: string;
    isHealthy: boolean;
    timestamp: string;
    itemsStatuses: {[name: string]: ItemStatus };
}

/**
 * Status of a single metric in a microservice
 */
interface ItemStatus {
    isHealthy: boolean;
    timestamp: string;
}