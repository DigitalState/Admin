import { Component, Injector, OnChanges, SimpleChanges } from '@angular/core';

import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { AuthService } from '../../../../shared/modules/auth/auth.service';
import { User } from '../../../../shared/modules/auth/user';
import { IdentityApiService } from '../../../../shared/services/identity.service';
import { FormioApiService } from '../../../../shared/services/formio-api.service';
import { FormioController } from "../../../../shared/components/modals/formio-controller";
import { FormioModalFrameComponent } from "../../../../shared/components/modals/formio-modal-frame.component";

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityListComponent } from '../../../components/base-list.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'ds-task-list',
    templateUrl: '../templates/task-list.template.html'
})
export class DsTaskListComponent extends DsBaseEntityListComponent implements FormioController {

    entityUrlPrefix = 'tasks';
    headerTitle = 'general.menu.tasks';
    pageTitle = 'general.menu.tasks';
    // actions: Array<any> = [
    //     {
    //         name: 'activate',
    //         title: 'ds.microservices.entity.action.activate',
    //         class: 'btn btn-default btn-with-icon',
    //         iconClass: 'ion-power',
    //         visible: true,
    //     },
    //     {
    //         name: 'claim',
    //         title: 'ds.microservices.entity.action.claim',
    //         class: 'btn btn-default btn-with-icon',
    //         // iconClass: 'ion-power',
    //         visible: false,
    //     },
    //     {
    //         name: 'unclaim',
    //         title: 'ds.microservices.entity.action.unclaim',
    //         class: 'btn btn-default btn-with-icon',
    //         // iconClass: 'ion-power',
    //         visible: false,
    //     },
    // ];

    // @todo Hardcoded "Public Works" UUID is used as a default OwnerUuid in Tasks custom filter
    defaultOwnerUuid = '8454c987-cbc5-4a24-ba1a-d420283caabd';
    businessUnits: Array<any>;
    authUser: User;

    formioModal: NgbModalRef;
    iFrameModalComponent: FormioModalFrameComponent;
    selectedEntityUuid: string; // set upon clicking `Activate` on a row

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService,
                protected identityApiService: IdentityApiService,
                protected auth: AuthService,
                protected formioApiService: FormioApiService,
                protected modal: NgbModal) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
        this.authUser = this.auth.getAuthUser();
        this.formioApiService.setEntityApiService(entityApiService);
    }

    ngOnDestroy() {
        if (this.formioModal) {
            this.formioModal.close();
        }

        super.ngOnDestroy();
    }

    setupUi(): any {
        this.datatableAttributes.headerHeight = 45;

        this.headerActions = this.headerActions.map((action: any) => {
            switch (action.name) {
                case 'create':
                    action.visible = false;
                    break;
            }
            return action;
        });

        this.actions = this.actions.map((action: any) => {
            switch (action.name) {
                case 'edit':
                    action.visible = false;
                    break;
            }

            return action;
        });

        // Add the `Activate` action to list items
        this.actions.push({
            name: 'activate',
            title: 'ds.microservices.entity.action.activate',
            class: 'btn btn-default btn-with-icon',
            iconClass: 'ion-power',
            visible: true,
        });

        return super.setupUi();
    }

    setupList() {
        super.setupList();
        this.columns = [
            { prop: 'uuid', cellTemplate: this.textCellUuidTpl, headerTemplate: this.headerTpl, filterable: false, sortable: false },
            { prop: 'title', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: false },
            { prop: 'identityUuid', cellTemplate: this.textCellUuidTpl, headerTemplate: this.headerTpl, filterable: false, sortable: false },
            { prop: 'createdAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: false, sortable: false },
            { prop: 'dueAt', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: false, sortable: false },
            { prop: 'priority', cellTemplate: this.textCellTpl, headerTemplate: this.headerTpl, filterable: false, sortable: false },
        ];
    }

    protected setupQuery(): void {
        super.setupQuery();
        this.query.setFilter('ownerUuid', this.defaultOwnerUuid);
    }

    protected setupCustomFilters(): any {
        // Load all the Business Units in the system and use them to populate the `ownerUuid` filter dropdown
        this.identityApiService.getIdentityResource('BusinessUnit').getList().subscribe(businessUnits => {
            console.log(businessUnits);
            this.businessUnits = businessUnits;
            this.customFiltersForm = this.formBuilder.group({
                'ownerUuid': this.defaultOwnerUuid
            });

            this.showCustomFilters = true;

            if (!this.customFiltersFormChangeSubscription) {
                this.customFiltersFormChangeSubscription = this.customFiltersForm.valueChanges.subscribe(formData => {
                    this.onCustomFiltersChange(formData);
                });
            }
        });
    }

    /**
     * Handle changes made to the Custom Filters form.
     * @param formData
     */
    protected onCustomFiltersChange(formData) {
        this.query.setFilter('ownerUuid', formData.ownerUuid);
        this.refreshList()
    }

    /**
     * Call this method to reset the from (e.g: using a Reset button for example).
     */
    protected resetCustomFilters() {
        this.customFiltersForm.reset({
            'ownerUuid': this.defaultOwnerUuid
        });
    }

    /**
     *
     * @param fetchedData
     * @returns {any}
     */
    // protected preprocessRowsData(fetchedData): Array<any> {
    //     let rows;
    //     let userIdentityUuid = this.authUser.identityUuid;
    //
    //     if (fetchedData) {
    //         rows = fetchedData.map((row) => {
    //             row['_'] = {
    //                 'actions': this.actions.map(action => {
    //                     switch (action.name) {
    //                         case 'claim':
    //                             action.visible = (userIdentityUuid !== row.identityUuid);
    //                             break;
    //                         case 'unclaim':
    //                             action.visible = (userIdentityUuid === row.identityUuid);
    //                             break;
    //                     }
    //                     return clone(action);
    //                 })
    //             };
    //             return row;
    //         });
    //     }
    //     return rows;
    // }

    protected handleRowEvent(event: any) {
        let relativePath = '../';

        switch (event.action.name) {
            case 'activate':
                // this.router.navigate([relativePath, event.row.uuid, 'activate'], { relativeTo: this.route });
                this.activateFormioForm(event.row);
                break;
            default:
                super.handleRowEvent(event);
                break;
        }
    }

    // // // Formio // // // // // // // // // // // // // // // // // // // // // // //

    protected activateFormioForm(entity) {
        this.selectedEntityUuid = entity.uuid;
        this.openModalIFrame();
    }

    protected openModalIFrame() {
        const modalOptions: NgbModalOptions = {
            size: 'lg',
            windowClass: 'formio-modal-frame',
        };

        this.formioModal = this.modal.open(FormioModalFrameComponent, modalOptions);
        this.iFrameModalComponent = this.formioModal.componentInstance;
        this.iFrameModalComponent.setFormioController(this);
    }

    requestFormioForm(): Observable<any> {
        return this.formioApiService.getForm('tasks', this.selectedEntityUuid);
    }

    submitFormioForm(formData: any): Observable<any> {
        return this.formioApiService.submitFormUsingPut('tasks', this.selectedEntityUuid, formData, 'submission').flatMap(submissionResult => {
            this.formioModal.close();
            this.toastr.success(this.translate.instant('ds.microservices.entity.task.submissionSuccess'));
            this.refreshList();
            return Observable.of(submissionResult);
        });
    }

    handleFormioFormEvent(lifeCycleMethod: string, arg: any) {
        // Do nothing
    }

}
