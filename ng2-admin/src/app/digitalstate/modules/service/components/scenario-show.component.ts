import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ApiUtils } from '../../../../shared/utils/api.utils';

@Component({
    selector: 'ds-scenario-show',
    templateUrl: '../templates/scenario-show.template.html'
})
export class DsScenarioShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    headerTitle = 'ds.microservices.entity.types.scenario';
    headerSubtitle = null;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;

        // Create a place-holder for the back-link until it gets generated
        this.backLink = this.getEmptyBackLink();
    }

    ngOnInit() {
        // Add the `activate` action
        this.actions.push({
            name: 'activate',
            title: 'ds.microservices.entity.action.activate',
            class: 'btn btn-secondary btn-with-icon',
            iconClass: 'ion-power',
            visible: true,
            routerLink: ['../activate'],
            region: 'header',
        });

        super.ngOnInit();
    }

    /**
     * Override to get the parent's entity UUID from the entity itself if not detected int the URL.
     */
    protected prepareEntityParent(urlPrefix: string, urlParam: string): Observable<any> {
        if (!urlParam) {
            urlParam = ApiUtils.getUuidFromUri(this.entity.service);
        }
        return super.prepareEntityParent(urlPrefix, urlParam);
    }
}
