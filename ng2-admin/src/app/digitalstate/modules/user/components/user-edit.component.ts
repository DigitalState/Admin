import { Component, Injector } from '@angular/core';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';

import 'rxjs/Rx';

@Component({
    selector: 'ds-user-edit',
    templateUrl: '../templates/user-form.template.html'
})
export class DsUserEditComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'users';
    headerTitle = 'ds.microservices.entity.types.user';
    isNew = false;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    getPropertiesToRemoveOnSave(): Array<string> {
        return super.getPropertiesToRemoveOnSave().concat(
            'groups',
            'roles',
        );
    }

    protected setBreadcrumbData(): void {
        super.setBreadcrumbData();

        if (this.entity) {
            this.pageBreadcrumbData.title = this.headerTitle;
        }
    }
}
