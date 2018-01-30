import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import without from 'lodash/without';
import { NgForm } from '@angular/forms';


export class DsScenarioFormComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    pageTitle = 'general.menu.serviceDirectory';
    headerSubtitle = null;

    constructor(injector: Injector,
                translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);

        this.translate = translate;
        this.entityApiService = entityApiService;

        // Create a place-holder for the back-link until it gets generated
        this.backLink = this.getEmptyBackLink();
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;

            this.entity = entity;
            return Observable.of({'entity': entity, 'entityParent': prepared.entityParent});
        });
    }

    /**
     * Set for removal mutually-exclusive `data` properties for various scenario types.
     * @returns {Array<string>}
     */
    getPropertiesToRemoveOnSave(): Array<string> {
        let scenarioTypeProps = ['process_definition_key', 'info', 'link'];
        // let propsToRemove = without(scenarioTypeProps, this.entity.type).map(prop => 'data.' + prop);
        let propsToRemove = [];

        switch(this.entity.type) {
            case 'bpm':
                // propsToRemove.push('link', 'info', 'variable_name', 'value');
                propsToRemove.push('link', 'info', 'value');
                break;
            case 'info':
                propsToRemove.push('link', 'bpm', 'process_definition_key');
                break;
            case 'link':
                propsToRemove.push('bpm', 'process_definition_key', 'info');
                break;
        }

        propsToRemove = propsToRemove.map(prop => 'data.' + prop);
        return super.getPropertiesToRemoveOnSave().concat(propsToRemove);
    }

}
