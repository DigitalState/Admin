import { Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';

export class DsCmsFormComponent extends DsBaseEntityFormComponent {

    pageTitle = 'general.menu.cms';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    // /**
    //  * Update link route to include the current component's entityUrlPrefix
    //  * in the route to its listing.
    //  */
    // protected generateListBackLink(): Link {
    //     return super.generateListBackLink();
    //
    //     // let link = super.generateListBackLink();
    //
    //
    //     // const pathReplacementSuffix = '/' + this.entityUrlPrefix + '/list';
    //     //
    //     // if (this.backLink.routerLink[0].indexOf(pathReplacementSuffix) === -1) {
    //     //     this.backLink.routerLink[0] = this.backLink.routerLink[0].replace('/list', pathReplacementSuffix);
    //     // }
    //     //
    //     //
    //     // const currentPath = this.location.path();
    //     // // // If the location ends with `create` or `edit`
    //     // if (/\/(edit|create)$/.test(currentPath)) {
    //     //     link.routerLink = ['../../' + this.entityUrlPrefix + '/list'];
    //     // }
    //     // else { // otherwise, assume a formLang is present at the end of the path
    //     //     link.routerLink = ['../../../list'];
    //     // }
    //     //
    //
    //     // this.backLink = link;
    //     // return this.backLink;
    // }
}
