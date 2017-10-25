import { Inject, Injectable, Injector } from '@angular/core';
import { MICROSERVICE_RESTANGULAR } from '../../../shared/providers/microservice.provider';
import { DsBaseEntityApiService } from '../../../shared/services/base-entity-api.service';

import 'rxjs/Rx';

@Injectable()
export class EntityApiService extends DsBaseEntityApiService<any> {

    constructor(@Inject(MICROSERVICE_RESTANGULAR) public restangular, 
                protected injector: Injector) {
        super(restangular, injector);
    }

}
