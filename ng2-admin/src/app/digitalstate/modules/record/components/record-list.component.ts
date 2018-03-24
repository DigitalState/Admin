import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { IdentityApiService } from '../../../../shared/services/identity.service';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-record-list',
    templateUrl: '../templates/record-list.template.html'
})
export class DsRecordListComponent extends DsBaseEntityListComponent {

    entityUrlPrefix = 'records';
    pageTitle = 'general.menu.records';
    headerTitle = 'general.menu.records';

    // Options map of the associated entity types. We use translatable labels as values.
    protected associatedEntities: any = {
        ' ': 'general.any', // Blank space in key to workaround md-select empty-key default value assignement issue
        'Case': 'ds.microservices.entity.types.case',
        'Service': 'ds.microservices.entity.types.service'
    };


    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService,
                protected identityApiService: IdentityApiService) {
        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'uuid', cellTemplate: this.textCellUuidTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true },
            { prop: 'createdAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
            { prop: 'updatedAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
        ];
    }

    protected setupQuery(): void {
        super.setupQuery();
        // this.query.setFilter('associated.entity', this.defaultAssociatedEntity);
    }

    protected setupCustomFilters(): any {
        // Load all the Business Units in the system and use them to populate the `ownerUuid` filter dropdown
        this.identityApiService.getIdentityResource('BusinessUnit').getList().subscribe(businessUnits => {
            this.customFiltersForm = this.formBuilder.group({
                'associatedEntity': ' ',
                'associatedEntityUuid': '',
            });

            this.showCustomFilters = true;

            // if (!this.customFiltersFormChangeSubscription) {
            //     this.customFiltersFormChangeSubscription = this.customFiltersForm.valueChanges.subscribe(formData => {
            //         this.onCustomFiltersChange(formData);
            //     });
            // }
        });
    }

    /**
     * Handle changes made to the Custom Filters form.
     * @param formData
     */
    protected onCustomFiltersChange(formData) {
        // // Make sure to trim key since it's the default selection to clear the filter
        // if (formData.associatedEntity && formData.associatedEntity.trim().length > 0) {
        //     this.query.setFilter('associated.entity', formData.associatedEntity);
        // }
        // else {
        //     this.query.unsetFilter('associated.entity');
        // }
        //
        // this.refreshList();
        this.applyCustomFilters();
    }

    /**
     * Call this method to reset the from (e.g: using a Reset button for example).
     * The form data values are trimmed to determine whether to set or unset the filter.
     */
    protected applyCustomFilters() {
        const formData = this.customFiltersForm.value;

        if (formData.associatedEntity && formData.associatedEntity.trim().length > 0) {
            this.query.setFilter('associated.entity', formData.associatedEntity);
        }
        else {
            this.query.unsetFilter('associated.entity');
        }

        if (formData.associatedEntityUuid && formData.associatedEntityUuid.trim().length > 0) {
            this.query.setFilter('associated.entityUuid', formData.associatedEntityUuid);
        }
        else {
            this.query.unsetFilter('associated.entityUuid');
        }

        this.refreshList();
    }
}
