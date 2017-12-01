import { Component, Injector, Input } from '@angular/core';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

import remove from 'lodash/remove';

@Component({
    selector: 'ds-scenario-list',
    templateUrl: '../templates/scenario-list.template.html'
})
export class DsScenarioListComponent extends DsBaseEntityListComponent {

    @Input() entityParent: any;

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    headerTitle = 'general.menu.scenarios';
    headerSubtitle = '';

    // Dropdown Actions
    headerCreateActions: Array<any> = [
        {
            title: 'ds.microservices.entity.property.info',
            routerLink: ['../scenarios/create/info'],
        },
        {
            title: 'ds.microservices.entity.property.bpm',
            routerLink: ['../scenarios/create/bpm'],
        },
        {
            title: 'ds.microservices.entity.property.url',
            routerLink: ['../scenarios/create/url'],
        },
        {
            title: 'ds.microservices.entity.property.api',
            routerLink: ['../scenarios/create/api'],
        },
    ];

    protected routeParamsSubscription: Subscription;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    ngOnInit() {
        // Keep only the `refresh` action in the default headerActions since we are creating
        // a custom template for the `create` action (dropdown with links to multiple scenario types)
        remove(this.headerActions, (action: any) => { return action.name !== 'refresh' });

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
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'type', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: true, sortable: false },
            { prop: 'createdAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, sortable: true, filterable: false },
        ];
    }

    protected setupQuery(): void {
        super.setupQuery();
        this.query.setFilter('service.uuid', this.entityParent.uuid);
        this.query.setFilter('order[weight]', 'asc');
    }

    protected updateTranslations(newLang: string) {
        super.updateTranslations(newLang);

        if (this.entityParent.hasOwnProperty('title') && this.entityParent.title.hasOwnProperty(newLang)) {
            this.headerSubtitle = this.entityParent.title[newLang];
        }
    }

    protected handleRowEvent(event: any) {
        let relativePath = '../';

        switch (event.action.name) {
            case 'edit':
                this.router.navigate([relativePath, 'scenarios', event.row.uuid, 'edit', event.row.type], { relativeTo: this.route });
                break;
            default:
                super.handleRowEvent(event);
                break;
        }
    }
}
