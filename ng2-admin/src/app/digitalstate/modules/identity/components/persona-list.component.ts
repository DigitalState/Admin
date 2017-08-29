import { Component, Injector, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
import find from 'lodash/find';

@Component({
    selector: 'ds-persona-list',
    templateUrl: '../../../templates/generic-list.template.html'
})
export class DsPersonaListComponent extends DsBaseEntityListComponent {

    @Input() entityParent: any;
    @Input() entityParentSingular: any; // e.g.: 'individual'

    headerTitle = 'general.menu.personas';
    headerSubtitle = '';

    protected routeParamsSubscription: Subscription;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
    }

    ngOnInit() {
        this.entityUrlPrefix = this.entityParentSingular + '-personas';

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
        ];
    }

    protected setupQuery(): void {
        super.setupQuery();
        this.query.setFilter(this.entityParentSingular + '.uuid', this.entityParent.uuid);
        this.query.setFilter('order[updatedAt]', 'desc');
    }

    /**
     * Handle header actions.
     * By default this method attempts to use the routerLink (if any) in the action and navigate to it.
     * @param event { action: object }
     */
    protected handleHeaderEvent(event: any) {
        let relativePath = '../';

        switch (event.action.name) {
            case 'create':
                this.router.navigate([relativePath, 'personas', 'create'], { relativeTo: this.route });
                break;
            default:
                super.handleHeaderEvent(event);
                break;
        }
    }

    protected handleRowEvent(event: any) {
        let relativePath = '../';

        switch (event.action.name) {
            case 'show':
                this.router.navigate([relativePath, 'personas', event.row.uuid, 'show'], { relativeTo: this.route });
                break;
            case 'edit':
                this.router.navigate([relativePath, 'personas', event.row.uuid, 'edit'], { relativeTo: this.route });
                break;
            default:
                super.handleRowEvent(event);
                break;
        }
    }
}
