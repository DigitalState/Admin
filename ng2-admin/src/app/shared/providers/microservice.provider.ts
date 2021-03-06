
import { Restangular } from 'ngx-restangular';
import { InjectionToken } from '@angular/core';
import { AuthService } from '../modules/auth/auth.service';

/* * * Microservice configuration Provider * * * * * * * * * * * * */

export class MicroserviceConfig {
    name: string;
    settings: any;
}

/* * * Restangular Provider * * * * * * * * * * * * * * * * * * * * */

/**
 * A marker to verify whether the default RequestInterceptor function has
 * been defined so it does not get redefined when new microservice modules
 * are loaded.
 * @type {boolean}
 */
let microserviceInterceptorAdded = false;

/**
 * This factory method creates a specialized Restangular instance that
 * corresponds to individual Microservice configurations.
 *
 * @param restangular
 * @param microserviceConfig
 * @returns {any}
 */
export let microserviceRestangularFactory = (restangular: Restangular, auth: AuthService, microserviceConfig: MicroserviceConfig) => {

    return restangular.withConfig((restangularConfigurer) => {
        restangularConfigurer.setBaseUrl(microserviceConfig.settings.entrypoint.url);

        if (microserviceInterceptorAdded === false) {
            microserviceInterceptorAdded = true;

            // Intercept requests to microservices and add the JWT token
            restangularConfigurer.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
                let result: any = {};
                let token = auth.getToken();

                result.headers = Object.assign({}, headers, { Authorization: `Bearer ${token}` });

                // Workaround for the `PUT` request bug which adds the backend controller twice to the url
                if (operation == 'put') {
                    console.log('RequestInterceptor::PUT', path, element);
                    // element['@id'] = element['@id'].replace('/app_dev.php', '');
                    // let newBaseUrl = microserviceConfig.settings.entrypoint.url.replace('/app_dev.php', '');
                    // restangularConfigurer.setBaseUrl(newBaseUrl);
                }

                return result;
            });
        }
    });
};

export const MICROSERVICE_RESTANGULAR = new InjectionToken<any>('MicroserviceRestangular');

export let MicroserviceRestangularProvider = {
    provide: MICROSERVICE_RESTANGULAR,
    useFactory: microserviceRestangularFactory,
    deps: [Restangular, AuthService, MicroserviceConfig]
};
