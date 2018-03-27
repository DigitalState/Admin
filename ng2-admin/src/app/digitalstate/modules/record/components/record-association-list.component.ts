import { Component, Injector, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
import find from 'lodash/find';

@Component({
    selector: 'ds-record-association-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsRecordAssociationListComponent extends DsBaseEntityListComponent {

    @Input() entityParent: any;

    entityUrlPrefix = 'record-associations';
    entityParentUrlPrefix = 'records';
    entityParentUrlParam = 'recordUuid';
    headerTitle = 'general.menu.recordAssociations';
    headerSubtitle = '';

    protected routeParamsSubscription: Subscription;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    ngOnInit() {
        // Skip fetching the entity parent if already set, for example, when passed in as a component input.
        if (this.entityParent) {
            super.ngOnInit();
        }
        else {
            this.routeParamsSubscription = this.route.params.subscribe(params => {
                this.entityApiService.getOne(this.entityParentUrlPrefix, params[this.entityParentUrlParam]).subscribe(res => {
                    this.entityParent = res;
                    super.ngOnInit();
                });
            });
        }
    }

    ngOnDestroy() {
        if (this.routeParamsSubscription) {
            this.routeParamsSubscription.unsubscribe();
        }
        super.ngOnDestroy();
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'uuid', cellTemplate: this.textCellUuidTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'entity', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'entityUuid', cellTemplate: this.textCellUuidTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'createdAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
        ];
    }

    protected setupQuery(): void {
        super.setupQuery();
        this.query.setFilter('record.uuid', this.entityParent.uuid);
        this.query.setFilter('order[createdAt]', 'desc');
    }

    protected updateTranslations(newLang: string) {
        super.updateTranslations(newLang);

        if (this.entityParent.hasOwnProperty('title') && this.entityParent.title.hasOwnProperty(newLang)) {
            this.headerSubtitle = this.entityParent.title[newLang];
        }
    }
}
