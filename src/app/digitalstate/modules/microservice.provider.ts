
import { Restangular } from 'ngx-restangular';
import { InjectionToken } from '@angular/core';

/* * * Microservice configuration Provider * * * * * * * * * * * * */

export class MicroserviceConfig {
    name: string;
    settings: any;
}

/* * * Restangular Provider * * * * * * * * * * * * * * * * * * * * */

/**
 * This factory method creates a specialized Restangular instance that
 * corresponds to individual Microservice configurations.
 *
 * @param restangular
 * @param microserviceConfig
 * @returns {any}
 */
let microserviceRestangularFactory = (restangular: Restangular, microserviceConfig: MicroserviceConfig) => {
    console.log('microserviceRestangularFactory: ', microserviceConfig );
    console.log('microserviceRestangularFactory: ', microserviceConfig );
    if (39) {
        console.log('39');
    }
    else {
        console.log('xx');
    }
    return restangular.withConfig((restangularConfigurer) => {
        console.log(restangularConfigurer);
        restangularConfigurer.setBaseUrl(microserviceConfig.settings.entrypoint.url);
    });
};

export const MICROSERVICE_RESTANGULAR = new InjectionToken<any>('MicroserviceRestangular');

export let MicroserviceRestangularProvider = {
    provide: MICROSERVICE_RESTANGULAR,
    useFactory: microserviceRestangularFactory,
    deps: [Restangular, MicroserviceConfig]
};
