import { Inject, Injectable, Injector } from '@angular/core';


import { AppState } from '../../../app.service';
import { AuthService } from '../../../shared/modules/auth/auth.service';
import { DsBaseEntityApiService } from '../../../shared/services/base-entity-api.service';
import { IdentityApiService } from '../../../shared/services/identity.service';
import { MICROSERVICE_RESTANGULAR } from '../../../shared/providers/microservice.provider';

import 'rxjs/Rx';

@Injectable()
export class EntityApiService extends IdentityApiService {

    constructor(@Inject(MICROSERVICE_RESTANGULAR) public restangular,
                protected injector: Injector,
                protected appState: AppState,
                protected auth: AuthService) {
        super(restangular, injector, appState, auth);
    }

}
