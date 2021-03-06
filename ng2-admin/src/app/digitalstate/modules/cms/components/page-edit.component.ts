import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-page-edit',
    templateUrl: '../templates/page-form.template.html'
})
export class DsPageEditComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'pages';
    pageTitle = 'general.menu.cms';
    headerTitle = 'ds.microservices.entity.types.page';
    backLink = new Link(['../../list'], 'general.list');
    isNew = false;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    /**
     * @Todo Refactor the entity assignment behavior below to the parent `prepareEntity()` method.
     * @return {Observable<R>}
     */
    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            this.entity = prepared.entity
            return Observable.of({'entity': this.entity });
        });
    }
}
