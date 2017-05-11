import { Observable } from 'rxjs';

import { Inject, Injectable} from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Pager } from '../models/pager';
import { PagedData } from '../models/paged-data';
import { Service } from '../modules/service/models/service';
import { ListQuery } from '../models/api-query';
import { MICROSERVICE_RESTANGULAR } from '../modules/microservice.provider';

import 'rxjs/Rx';

export class DsBaseEntityApiService {

    // constructor(private restangular: Restangular) {
    constructor(protected restangular: Restangular) {

    }

    /**
     * A method that mocks a paged server response
     * @param pager The selected pager
     * @returns {any} An observable containing the employee data
     */
    public getList(query: ListQuery): Observable<PagedData<Service>> {
        // const requestParams = {
        //     page: query.pager.pageNumber || 1,
        //     itemsPerPage: query.pager.size
        // };

        /** Todo: Create a API Query object to hold the Paging and Filtering parameters */
        // let x = this.restangular.all(query.path).getList(query.buildParameters());
        let x = this.restangular.withConfig((restangularConfigurer) => {
                restangularConfigurer.setBaseUrl(query.urlPrefix);
            }).all(query.path).getList(query.buildParameters());

        return x.reduce((pagedData, fetchedCollection) => {
            query.pager.totalItems = fetchedCollection.metadata['hydra:totalItems'];
            query.pager.totalPages = Math.ceil(query.pager.totalItems / query.pager.size);
            console.log('accumulator: ', pagedData);
            console.log('Received items: ', fetchedCollection);

            pagedData.pager = query.pager;
            pagedData.data = fetchedCollection.map(this.mapToEntity);
            return pagedData;
        }, new PagedData<Service>());

        // return this.restangular.all('services').getList().map(entity => this.getPagedData(pager));
        // return Observable.of(companyData).map(data => this.getPagedData(pager));
    }

    protected mapToEntity(fetchedEntity) {
        return fetchedEntity;
        // return new Service(
        //     fetchedEntity.uuid,
        //     fetchedEntity.title,
        //     fetchedEntity.presentation,
        //     fetchedEntity.form,
        //     fetchedEntity.description);
    }

    /**
     * Package companyData into a PagedData object based on the selected Pager
     * @param pager The pager data used to get the selected data from companyData
     * @returns {PagedData<Service>} An array of the selected data and pager
     */
    // private getPagedData(pager: Pager): PagedData<Service> {
    //     let pagedData = new PagedData<Service>();
    //     pager.totalItems = entityData.length;
    //     pager.totalPages = pager.totalItems / pager.size;
    //     let start = pager.pageNumber * pager.size;
    //     let end = Math.min((start + pager.size), pager.totalItems);
    //     for (let i = start; i < end; i++){
    //         let jsonObj = entityData[i];
    //         let entity = new Service(
    //             jsonObj.uuid,
    //             jsonObj.title,
    //             jsonObj.presentation,
    //             jsonObj.form,
    //             jsonObj.description);
    //         pagedData.data.push(entity);
    //     }
    //     pagedData.pager = pager;
    //     return pagedData;
    // }
}
