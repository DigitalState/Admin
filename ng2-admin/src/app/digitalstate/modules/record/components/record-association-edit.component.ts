import { Component, Injector } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from 'ng2-validation';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-record-association-edit',
    templateUrl: '../templates/record-association-form.template.html'
})
export class DsRecordAssociationEditComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'record-associations';
    entityParentUrlPrefix = 'records';
    entityParentUrlParam = 'recordUuid';
    headerTitle = 'ds.microservices.entity.types.recordAssociation';
    headerSubtitle = null;
    isNew = false;

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
            this.entity = prepared.entity;
            return Observable.of({'entity': this.entity});
        });
    }

    protected setBreadcrumbData(): void {
        super.setBreadcrumbData();
        this.pageBreadcrumbData.title = this.headerTitle;
    }

}
