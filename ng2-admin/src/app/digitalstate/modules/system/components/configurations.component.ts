import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
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
import { ListQuery } from '../../../models/api-query';


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

    /**
     * Default list query parameters to the `configs` endpoint
     */
    listQueryParams: any;

    /**
     * Progress indicator
     */
    protected showProgressIndicator: boolean;

    constructor(protected injector: Injector,
                protected route: ActivatedRoute,
                protected location: Location,
                protected restangular: Restangular,
                protected translate: TranslateService,
                protected toastr: ToastsManager,
                protected appState: AppState,
                protected auth: AuthService,
                protected dsEnv: DsEnvironmentConfig) {
        super(injector);

        this.listQueryParams = {
            'limit': 1000
        };
    }

    ngOnInit() {
        super.ngOnInit();
        this.commitBreadcrumb();

        // Determine whether a default microservice is set in the route paraemeters
        this.route.params.subscribe((params: Params) => {
            // Determine microservices eligible for configuration by intersecting them with ones provided by the environment
            const envMicroservicesKeys = sortBy(Object.keys(this.dsEnv.discovery));
            this.microservices = pick(this.appState.get('microservices'), envMicroservicesKeys);
            this.microservice = new MicroserviceConfig();

            // Build a Restangular instance out of the currently selected microservice
            if (isArray(envMicroservicesKeys) && envMicroservicesKeys.length > 0) {
                // If default microservice is not provided in the route, pick the first one from the microservices list
                let microserviceName = params['microservice'] && this.microservices.hasOwnProperty(params['microservice'])
                    ? params['microservice']
                    : Object.keys(this.microservices)[0];

                this.loadMicroserviceConfigs(microserviceName);
            }
        });
    }

    /**
     * Fetch a microservices' server-side configs
     *
     * @param microserviceName
     */
    loadMicroserviceConfigs(microserviceName) {
        this.microservice.name = microserviceName;
        this.microservice.settings = this.appState.get('microservices')[this.microservice.name];

        // Update the page URL with the selected microservice name
        this.location.go(`/pages/settings/configurations/${microserviceName}`);

        this.configs = null;
        this.showProgressIndicator = true;

        this.restangular = microserviceRestangularFactory(this.restangular, this.auth, this.microservice);
        this.restangular.all('configs').getList(this.listQueryParams)
            .finally(() => {
                this.showProgressIndicator = false;
            })
            .subscribe(configs => {
                this.configs = configs;
            }, error => {
                // Clear the current configs model
                console.warn('Error fetching configs', error);
                this.configs = null;
            });
    }

    /**
     * Update the server-side Config entity given a Config model and optionally a specific property/value.
     * Currently this method ignores the custom property/value arguments and saves a preset data structure of the model.
     *
     * @param config
     * @param property
     * @param value
     */
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

    /**
     * Config save success handler
     *
     * @param response
     */
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

    /**
     * Config save error handler
     *
     * @param error
     */
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
