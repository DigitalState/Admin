import { Component, Injector } from '@angular/core';

import { UserApiService } from '../../../../shared/services/user-api.service';
import { IdentityUtils } from '../../../../shared/utils/identity.utils';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { LocalApiUtils } from '../../../utils/local-api.utils';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'ds-identity-show',
    templateUrl: '../templates/identity-show.template.html'
})
export class DsIdentityShowComponent extends DsBaseEntityShowComponent {

    userApi: UserApiService;

    pageTitle = 'general.menu.identities';
    backLink = new Link(['../../list'], 'general.list');
    identitySingularName: string;

    /** Links to User entities that are associated with the identity */
    userLinks: Array<any>;

    protected routeParamsChange = 0;
    protected prepareEntitySubscription: Subscription;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.userApi = injector.get(UserApiService);
    }

    ngOnInit() {
        this.identitySingularName = IdentityUtils.getSingular(this.entityUrlPrefix);
        super.ngOnInit();

        // @workaround for Component life-cycle methods (ngOnInit) not being triggered by Router when navigating to a route that is handled by the same component
        this.route.params.subscribe(params => { // on Route params change
            this.routeParamsChange++;

            if (this.routeParamsChange > 1) {
                // Reset the local `entity` var so `prepareEntity()` can request a fresh copy
                this.entity = null;
                this.entityParent = null;

                // Avoid multiple subscriptions
                if (this.prepareEntitySubscription) {
                    this.prepareEntitySubscription.unsubscribe();
                }

                this.prepareEntitySubscription = this.prepareEntity().subscribe();
            }
        });
    }

    onEntityPrepared(): void {
        super.onEntityPrepared();

        this.userApi.loadUsersByIdentity(this.entity.uuid).subscribe((users: Array<any>) => {
            this.userLinks = users.map(user => {
                return LocalApiUtils.createEntityLink('user', user.uuid, user.uuid);
            });
        });
    }

    ngOnDestroy() {
        if (this.prepareEntitySubscription) {
            this.prepareEntitySubscription.unsubscribe();
        }
    }
}

@Component({
    selector: 'ds-business-unit-show',
    templateUrl: '../templates/business-unit-show.template.html'
})
export class DsBusinessUnitShowComponent extends DsIdentityShowComponent {

    entityUrlPrefix = 'business-units';
    headerTitle = 'ds.microservices.entity.types.businessUnit';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-organization-show',
    templateUrl: '../templates/identity-show.template.html'
})
export class DsOrganizationShowComponent extends DsIdentityShowComponent {

    entityUrlPrefix = 'organizations';
    headerTitle = 'ds.microservices.entity.types.organization';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-individual-show',
    templateUrl: '../templates/identity-show.template.html'
})
export class DsIndividualShowComponent extends DsIdentityShowComponent {

    entityUrlPrefix = 'individuals';
    headerTitle = 'ds.microservices.entity.types.individual';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-staff-show',
    templateUrl: '../templates/identity-show.template.html'
})
export class DsStaffShowComponent extends DsIdentityShowComponent {

    entityUrlPrefix = 'staffs';
    headerTitle = 'ds.microservices.entity.types.staff';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}

@Component({
    selector: 'ds-anonymous-show',
    templateUrl: '../templates/identity-show.template.html'
})
export class DsAnonymousShowComponent extends DsIdentityShowComponent {

    entityUrlPrefix = 'anonymouses';
    headerTitle = 'ds.microservices.entity.types.anonymous';

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig, entityApiService);
    }
}
