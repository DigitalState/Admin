import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Page } from '../models/page';
import { PagedData } from '../models/paged-data';
import { Service } from './models/service';

import 'rxjs/Rx';

@Injectable()
export class EntityApiService {

    constructor(private restangular: Restangular) {

    }

    /**
     * A method that mocks a paged server response
     * @param page The selected page
     * @returns {any} An observable containing the employee data
     */
    public getResults(page: Page): Observable<PagedData<Service>> {
        return this.restangular.all('services').getList().map(entity => this.getPagedData(page));
        // return Observable.of(companyData).map(data => this.getPagedData(page));
    }

    /**
     * Package companyData into a PagedData object based on the selected Page
     * @param page The page data used to get the selected data from companyData
     * @returns {PagedData<Service>} An array of the selected data and page
     */
    private getPagedData(page: Page): PagedData<Service> {
        let pagedData = new PagedData<Service>();
        page.totalElements = entityData.length;
        page.totalPages = page.totalElements / page.size;
        let start = page.pageNumber * page.size;
        let end = Math.min((start + page.size), page.totalElements);
        for (let i = start; i < end; i++){
            let jsonObj = entityData[i];
            let entity = new Service(
                jsonObj.uuid,
                jsonObj.title,
                jsonObj.presentation,
                jsonObj.form,
                jsonObj.description);
            pagedData.data.push(entity);
        }
        pagedData.page = page;
        return pagedData;
    }
}
