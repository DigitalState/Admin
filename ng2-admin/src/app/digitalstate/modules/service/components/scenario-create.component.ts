import { Component, Injector } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Slug } from 'ng2-slugify';
import { TranslateService } from '@ngx-translate/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsScenarioFormComponent } from './scenario-form.component';

import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import assign from 'lodash/assign';

// @Component({
//     selector: 'ds-scenario-create',
//     templateUrl: '../templates/scenario-form.template.html'
// })
export class DsScenarioCreateComponent extends DsScenarioFormComponent {

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    headerTitle = 'ds.microservices.entity.types.scenario';
    isNew = true;

    slug: Slug = null;
    autoSluggify = true;

    protected routeParamsSubscription: Subscription;

    constructor(injector: Injector,
                translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, translate, microserviceConfig, entityApiService);
        this.slug = new Slug('default');
    }

    ngOnInit() {
        this.routeParamsSubscription = this.route.params.subscribe(params => {
            this.entityApiService.getOne(this.entityParentUrlPrefix, params[this.entityParentUrlParam]).subscribe(res => {
                this.entityParent = res;
                super.ngOnInit();
            });
        });
    }

    /**
     * Add the `Service` association to the newly created `Scenario` entity by assigning
     * the service's IRI to the `service` property.
     */
    protected createBlankEntity(): any {
        return super.createBlankEntity().flatMap(entity => {
            entity.service = '/' + this.entityParentUrlPrefix + '/' + this.entityParent.uuid;
            return Observable.of(entity);
        });
    }

    saveNewEntity(): any {
        return super.saveNewEntity();
    }

    // getRoutingUrlOnSave(response: any): Array<any> {
    //     return ['../../' + response.uuid, 'show'];
    // }

    onValueChanged(data?: any) {
        super.onValueChanged(data);

        if (this.autoSluggify && data && isString(data.title) && !isEmpty(data.title)) {
            this.entity.slug = this.slug.slugify(data.title);
        }
    }

    // onFormLanguageChange(newLanguage) {
    //     super.onFormLanguageChange(newLanguage);
    //
    //     // Disable auto-sluggify to avoid overwriting the slug when the interface language is changed
    //     this.autoSluggify = false;
    // }
}


@Component({
    selector: 'ds-scenario-create-info',
    templateUrl: '../templates/scenario-form-info.template.html'
})
export class DsScenarioCreateInfoComponent extends DsScenarioCreateComponent {

    constructor(injector: Injector,
                translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, translate, microserviceConfig, entityApiService);
    }

    protected createBlankEntity(): any {
        return super.createBlankEntity().flatMap(entity => {
            entity.type = 'info';
            return Observable.of(entity);
        });
    }
}

@Component({
    selector: 'ds-scenario-create-bpm',
    templateUrl: '../templates/scenario-form-bpm.template.html'
})
export class DsScenarioCreateBpmComponent extends DsScenarioCreateComponent {

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

    protected createBlankEntity(): any {
        return super.createBlankEntity().flatMap(entity => {
            entity.type = 'bpm';
            entity.config = {
                'bpm': 'camunda',
                'process_definition_key': '',
            };

            // Initialize multilingual metadata
            entity.data = {};
            this.translate.langs.forEach(function(lang) {
                entity.data[lang] = {};
                entity.data[lang]['button_text'] = '';
            });

            return Observable.of(entity);
        });
    }
}

@Component({
    selector: 'ds-scenario-create-url',
    templateUrl: '../templates/scenario-form-url.template.html'
})
export class DsScenarioCreateUrlComponent extends DsScenarioCreateComponent {

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

    protected createBlankEntity(): any {
        return super.createBlankEntity().flatMap(entity => {
            entity.type = 'url';
            entity.config = {
                'url': '',
            };

            // Initialize multilingual metadata
            entity.data = {};
            this.translate.langs.forEach(function(lang) {
                entity.data[lang] = {};
                entity.data[lang]['button_text'] = '';
            });

            return Observable.of(entity);
        });
    }
}


@Component({
    selector: 'ds-scenario-create-api',
    templateUrl: '../templates/scenario-form-api.template.html'
})
export class DsScenarioCreateApiComponent extends DsScenarioCreateComponent {

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

    protected createBlankEntity(): any {
        return super.createBlankEntity().flatMap(entity => {
            entity.type = 'api';
            entity.config = {
                'url': '',
            };

            // Initialize multilingual metadata
            entity.data = {};
            this.translate.langs.forEach(function(lang) {
                entity.data[lang] = {};
                entity.data[lang]['button_text'] = '';
            });

            return Observable.of(entity);
        });
    }
}