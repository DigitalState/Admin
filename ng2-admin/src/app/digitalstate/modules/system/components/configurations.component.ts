import { Component, Injector } from '@angular/core';
import { FormGroup, FormArray, FormControl, NgForm, Validators } from '@angular/forms';

import { Restangular } from 'ngx-restangular';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { TranslateService } from '@ngx-translate/core';

import { DsPageComponent } from '../../../../shared/components/page-component';
import { MicroserviceConfig, microserviceRestangularFactory } from '../../../../shared/providers/microservice.provider';
import { DsEnvironmentConfig } from '../../../../shared/providers/environment.provider';
import { AuthService } from "../../../../shared/modules/auth/auth.service";

import { AppState } from '../../../../app.service';

import findIndex from 'lodash/findIndex';
import isArray from 'lodash/isArray';
import pick from 'lodash/pick';
import sortBy from 'lodash/sortBy';


@Component({
    selector: 'ds-system',
    templateUrl: '../templates/configurations.template.html',
    styleUrls: ['../styles/configurations.scss'],
})
export class DsConfigurationsComponent extends DsPageComponent {

    pageTitle = 'general.menu.configurations';

    microservices: { [id: string]: any };

    /**
     * Current Microservice
     */
    microservice: MicroserviceConfig;

    /**
     * Current Microservice configurations obtained by `/configs` API request
     */
    configs: Array<any>;


    constructor(protected injector: Injector,
                protected restangular: Restangular,
                protected translate: TranslateService,
                protected toastr: ToastsManager,
                protected appState: AppState,
                protected auth: AuthService,
                protected dsEnv: DsEnvironmentConfig) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();

        // Determine microservices eligible for configuration by intersecting them with ones provided by the environment
        const envMicroservicesKeys = sortBy(Object.keys(this.dsEnv.dsDiscoveryEnv));
        this.microservices = pick(this.appState.get('microservices'), envMicroservicesKeys);
        this.microservice = new MicroserviceConfig();

        // Build a Restangular instance out of the currently selected microservice
        if (isArray(envMicroservicesKeys) && envMicroservicesKeys.length > 0) {
            // this.microservice.name = Object.keys(this.microservices)[0];
            const microserviceName = Object.keys(this.microservices)[0];

            // Fetch microservices server-side configs
            this.loadMicroserviceConfigs(microserviceName);
        }
    }

    loadMicroserviceConfigs(microserviceName) {
        this.microservice.name = microserviceName;
        this.microservice.settings = this.appState.get('microservices')[this.microservice.name];
        this.restangular = microserviceRestangularFactory(this.restangular, this.auth, this.microservice);

        this.restangular.all('configs').getList().subscribe(configs => {
            console.log(configs);
            this.configs = configs;
        }, error => {
            // Clear the current configs model
            console.warn('Error fetching configs', error);
            this.configs = null;
        });
    }

    setCurrentMicroservice(microserviceName) {
        // this.microservice.name = microserviceName;
        this.loadMicroserviceConfigs(microserviceName);
    }

    saveConfig(config, property?, value?) {
        const headers = { 'Content-Type': 'application/json' };
        const outgoingConfig = {
            'value': config.value,
            'enabled': config.enabled,
            'version': config.version,
        };

        this.restangular.all('configs').customPUT(outgoingConfig, config.uuid, undefined, headers).subscribe((response) => {
            this.onConfigSave(response);
        }, (error) => {
            this.onConfigSaveError(error);
        });
    }

    onConfigSave(response) {
        console.log('Entity saved successfully, server response: ', response);
        this.toastr.success(this.translate.instant('ds.messages.entitySaveSucceeded'));

        // Store the returned entity back in the configs array
        if (response.uuid) {
            console.log('onConfigSave::response', response);
            const configIndex = findIndex(this.configs, { 'uuid': response.uuid });
            this.configs[configIndex] = response;
        }
        else {
            console.warn('Unexpected error: PUT response does not contain a UUID.', response);
            this.toastr.error(this.translate.instant('ds.messages.unexpectedError'));
        }
    }

    onConfigSaveError(error: any) {
        console.error('There was an error saving entity', error);
        let errorTitle = this.translate.instant('ds.messages.entitySaveFailed');
        let errorMessage = '';

        if (error.data && error.data['hydra:description']) {
            errorMessage = error.data['hydra:description'];
        }

        this.toastr.error(errorMessage, errorTitle);
    }

}
