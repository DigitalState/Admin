import { Injector } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from 'ng2-validation';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { IdentityUtils } from '../../../../shared/utils/identity.utils';

import { Link } from '../../../models/link';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

export class DsPersonaFormComponent extends DsBaseEntityFormComponent {

    entityParentUrlParam = 'identityUuid';
    headerTitle = 'ds.microservices.entity.types.persona';
    headerSubtitle = null;
    backLink = new Link(['../../../show'], 'ds.microservices.entity.types.identity');
    isNew = false;

    protected routeParamsSubscription: Subscription;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    protected generateBackLink(): Link {
        let link = super.generateBackLink();
        const indexOfPages = link.routerLink.indexOf('pages');

        link.text = 'ds.microservices.entity.types.identity';
        link.routerLink.splice(indexOfPages + 1, 0, 'identities');
        this.backLink = link;

        return this.backLink;
    }
}
