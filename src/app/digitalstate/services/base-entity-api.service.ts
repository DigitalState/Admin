import { Observable } from 'rxjs';

import { Restangular } from 'ngx-restangular';
import { PagedData } from '../models/paged-data';
import { Service } from '../modules/service/models/service';
import { ListQuery } from '../models/api-query';
import { MICROSERVICE_RESTANGULAR } from '../modules/microservice.provider';

import 'rxjs/Rx';

/**
 * Generic type <T> refers to an entity model such as Service, Case, etc...
 */
export abstract class DsBaseEntityApiService<T> {

    /**
     * Constructor
     * @param restangular An instance of Restangular that is pre-configured with the
     * settings (such as Base URL) that are specific to the EntityApiService extending
     * this class.
     */
    constructor(protected restangular: Restangular) {

    }

    /**
     * Proxy method for Restangular.all(...)
     * @param resourceUrl Entity path prefix (aka REST Resource collection) such as `services`, `cases`, etc...
     * @returns {any} An observable Restangular object
     */
    // public getList(query: ListQuery): Observable<PagedData<Service>> {
    public resource(resourceUrl: string): any {
        return this.restangular.all(resourceUrl);
    }

    /**
     * Fetch a single entity
     * @param entityUrlPrefix Entity path prefix (aka REST Resource collection) such as `services`, `cases`, etc...
     * @param id The unique entity identifier
     * @returns {any} An observable entity
     */
    // public getList(query: ListQuery): Observable<PagedData<Service>> {
    public getOne(entityUrlPrefix: string, id: any): Observable<T> {
        return this.restangular.one(entityUrlPrefix, id).get();
    }

    /**
     * Fetch a list of entities.
     * @param query
     * @returns {any} An observable of PagedData
     */
    // public getList(query: ListQuery): Observable<PagedData<Service>> {
    public getList(query: ListQuery): Observable<PagedData<T>> {
        // const requestParams = {
        //     page: query.pager.pageNumber || 1,
        //     itemsPerPage: query.pager.size
        // };

        /** Todo: Create a API Query object to hold the Paging and Filtering parameters */
        // let x = this.restangular.all(query.path).getList(query.buildParameters());
        // let x = this.restangular.withConfig((restangularConfigurer) => {
        //         restangularConfigurer.setBaseUrl(query.urlPrefix);
        //     }).all(query.path).getList(query.buildParameters());


        return this.restangular
            .all(query.path)
            .getList(query.buildParameters())
            .reduce((pagedData, fetchedCollection) => {
                query.pager.totalItems = fetchedCollection.metadata['hydra:totalItems'];
                query.pager.totalPages = Math.ceil(query.pager.totalItems / query.pager.size);
                console.log('accumulator: ', pagedData);
                console.log('Received items: ', fetchedCollection);

                pagedData.pager = query.pager;
                pagedData.data = fetchedCollection.map(this.mapToEntity);
                return pagedData;
        }, new PagedData<T>());
        // }, new PagedData<Service>());

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
