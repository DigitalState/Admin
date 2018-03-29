import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { ApiUtils } from '../../../../shared/utils/api.utils';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { LocalApiUtils } from '../../../utils/local-api.utils';

@Component({
    selector: 'ds-submission-show',
    templateUrl: '../templates/submission-show.template.html'
})
export class DsSubmissionShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'submissions';
    pageTitle = 'general.menu.serviceDirectory';
    headerTitle = 'ds.microservices.entity.types.submission';
    headerSubtitle = null;
    backLink = new Link(['../../list'], 'general.list');
    scenarioLink: any;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;

        // Create a place-holder for the back-link until it gets generated
        // this.backLink = this.getEmptyBackLink();
    }

    ngOnInit(): any {
        this.actions = this.actions.map((action: any) => {
            switch (action.name) {
                case 'edit':
                    action.visible = false;
                    break;
            }

            return action;
        });

        return super.ngOnInit();
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;
            this.scenarioLink = LocalApiUtils.createEntityLinkFromUri(entity.scenario);
            this.scenarioLink.title = ApiUtils.getUuidFromUri(entity.scenario);
            return Observable.of({'entity': entity, 'entityParent': prepared.entityParent});
        });
    }
}
