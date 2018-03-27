import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';
import { Slug } from 'ng2-slugify';
import { TranslateService } from '@ngx-translate/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';

import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

@Component({
    selector: 'ds-record-association-create',
    templateUrl: '../templates/record-association-form.template.html'
})
export class DsRecordAssociationCreateComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'record-associations';
    entityParentUrlPrefix = 'records';
    entityParentUrlParam = 'recordUuid';
    headerTitle = 'ds.microservices.entity.types.recordAssociation';
    isNew = true;

    protected routeParamsSubscription: Subscription;

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

    ngOnInit() {
        this.routeParamsSubscription = this.route.params.subscribe(params => {
            this.entityApiService.getOne(this.entityParentUrlPrefix, params[this.entityParentUrlParam]).subscribe(res => {
                this.entityParent = res;
                super.ngOnInit();
            });
        });
    }

    /**
     * Add the `Record` association to the newly created `Record association` entity by assigning
     * the record's IRI to the `record` property.
     */
    protected createBlankEntity(): any {
        return super.createBlankEntity().flatMap(entity => {
            entity.record = '/' + this.entityParentUrlPrefix + '/' + this.entityParent.uuid;

            try {
                if (entity.data) {
                    Object.keys(entity.data).forEach(function(key) {
                        entity.data[key] = JSON.stringify(entity.data[key], null, 2);
                    });
                }
            }
            catch(e) {
                console.warn('Error parsing incoming JSON', e)
            }

            return Observable.of(entity);
        });
    }
}
