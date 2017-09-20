import { Component, Injector } from '@angular/core';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { LocalApiUtils } from '../../../utils/local-api.utils';

@Component({
    selector: 'ds-task-submission-show',
    templateUrl: '../templates/submission-show.template.html'
})
export class DsSubmissionShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'submissions';
    pageTitle = 'general.menu.taskDirectory';
    headerTitle = 'ds.microservices.entity.types.submission';
    headerSubtitle = null;
    backLink = new Link(['../../list'], 'general.list');
    taskLink: any;

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

    // protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
    //     return super.prepareEntity().flatMap((prepared) => {
    //         let entity = prepared.entity;
    //         this.taskLink = LocalApiUtils.createEntityLinkFromUri(entity.scenario);
    //         return Observable.of({'entity': entity, 'entityParent': prepared.entityParent});
    //     });
    // }
}
