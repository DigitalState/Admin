import { Component, Injector } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    headerTitle = 'Edit Scenario';
    // headerTitle = 'general.menu.scenarios';
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
        if (!urlParam) {
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

    protected loadEntityMetaData(): void {
        super.loadEntityMetaData();
        let extraProps = pick(this.microserviceConfig.settings.entities[this.entityUrlPrefix].conditionalProperties, [
            'process_definition_key',
            'button_text',
        ]);

        assign(this.entityMetadata, extraProps);
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