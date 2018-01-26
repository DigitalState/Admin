import { Component, Injector } from '@angular/core';
import { FormArray, FormControl, NgForm, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import { TranslateService } from '@ngx-translate/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsScenarioFormComponent } from './scenario-form.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ApiUtils } from '../../../../shared/utils/api.utils';

import pick from 'lodash/pick';
import assign from 'lodash/assign';


// @Component({
//     selector: 'ds-scenario-edit',
//     templateUrl: '../templates/scenario-form.template.html'
// })
export class DsScenarioEditComponent extends DsScenarioFormComponent {

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    headerTitle = 'ds.microservices.entity.types.scenario';
    headerSubtitle = null;
    isNew = false;

    constructor(injector: Injector,
                translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, translate, microserviceConfig, entityApiService);
    }

    /**
     * Override to get the parent's entity UUID from the entity itself if not detected int the URL.
     */
    protected prepareEntityParent(urlPrefix: string, urlParam: string): Observable<any> {
        if (!urlParam && this.entity && this.entity.service) {
            urlParam = ApiUtils.getUuidFromUri(this.entity.service);
        }
        return super.prepareEntityParent(urlPrefix, urlParam);
    }

    getRoutingUrlOnSave(response: any): Array<any> {
        return ['../../show'];
    }
}

@Component({
    selector: 'ds-scenario-edit-info',
    templateUrl: '../templates/scenario-form-info.template.html'
})
export class DsScenarioEditInfoComponent extends DsScenarioEditComponent {

    constructor(injector: Injector,
                translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, translate, microserviceConfig, entityApiService);
    }

}

@Component({
    selector: 'ds-scenario-edit-bpm',
    templateUrl: '../templates/scenario-form-bpm.template.html'
})
export class DsScenarioEditBpmComponent extends DsScenarioEditComponent {

    constructor(injector: Injector,
                translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, translate, microserviceConfig, entityApiService);
    }

    ngOnInit() {
        super.ngOnInit();

        if (!this.entity) {
            this.entity = {};
        }

        if (!this.entity.config) {
            this.entity.config = {};
        }

        if (!this.entity.config.process_custom_data) {
            this.entity.config.process_custom_data = {};
        }
    }

    protected loadEntityMetaData(): void {
        super.loadEntityMetaData();
        let extraProps = pick(this.microserviceConfig.settings.entities[this.entityUrlPrefix].conditionalProperties, [
            'process_definition_key',
            'button_text',
            'enable_custom_variables',
            // 'variable_name',
            'variable_value',
        ]);

        assign(this.entityMetadata, extraProps);
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;

            try {
                if (entity.config) {
                    if (!entity.config.process_custom_data) {
                        entity.config.process_custom_data = {
                            'enable_custom_variables': false,
                            'variable_value': {},
                        };
                    }

                    // Create aliases for metadata properties
                    entity.config.process_custom_data.variable_value = entity.config.process_custom_data.value != null
                        ? JSON.stringify(entity.config.process_custom_data.value, null, 2)
                        : '{}';

                    entity.config.process_custom_data.enable_custom_variables = entity.config.process_custom_data.enabled;
                }
            }
            catch(e) {
                console.warn('Error parsing variable value as JSON', e);
            }

            this.entity = entity;
            return Observable.of({'entity': entity, 'entityParent': prepared.entityParent});
        });
    }

    onFormInit(form: NgForm) {
        super.onFormInit(form);

        setTimeout(() => {
            form.controls['variable_value'].setValidators([
                Validators.required,
                CustomValidators.json,
            ]);
        }, 0);
    }

    preSave(entity): any {
        let presavedEntity = super.preSave(entity);

        try {
            // Replace aliased metadata properties with their real names
            presavedEntity.config.process_custom_data.enabled = presavedEntity.config.process_custom_data.enable_custom_variables;
            delete presavedEntity.config.process_custom_data.enable_custom_variables;

            presavedEntity.config.process_custom_data.value = JSON.parse(this.entity.config.process_custom_data.variable_value);
            delete presavedEntity.config.process_custom_data.variable_value;
        }
        catch(e) {
            console.warn('Error parsing variable value as JSON', e);
            this.setFormError('variable_value', 'json');
            throw {
                'type': 'validation',
                'property': 'variable_value',
                'field': 'json',
                'language': this.formLang
            };
        }

        return presavedEntity;
    }
}

@Component({
    selector: 'ds-scenario-edit-url',
    templateUrl: '../templates/scenario-form-url.template.html'
})
export class DsScenarioEditUrlComponent extends DsScenarioEditComponent {

    constructor(injector: Injector,
                translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, translate, microserviceConfig, entityApiService);
    }

    protected loadEntityMetaData(): void {
        super.loadEntityMetaData();
        let extraProps = pick(this.microserviceConfig.settings.entities[this.entityUrlPrefix].conditionalProperties, [
            'url',
            'button_text',
        ]);

        assign(this.entityMetadata, extraProps);
    }
}

@Component({
    selector: 'ds-scenario-edit-api',
    templateUrl: '../templates/scenario-form-api.template.html'
})
export class DsScenarioEditApiComponent extends DsScenarioEditComponent {

    constructor(injector: Injector,
                translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, translate, microserviceConfig, entityApiService);
    }

    protected loadEntityMetaData(): void {
        super.loadEntityMetaData();
        let extraProps = pick(this.microserviceConfig.settings.entities[this.entityUrlPrefix].conditionalProperties, [
            'url',
            'button_text',
        ]);

        assign(this.entityMetadata, extraProps);
    }
}