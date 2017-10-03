import { Component, Injector } from '@angular/core';

import { NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { AuthService } from '../../../../shared/modules/auth/auth.service';
import { User } from '../../../../shared/modules/auth/user';
import { FormioApiService } from '../../../../shared/services/formio-api.service';
import { FormioController } from "../../../../shared/components/modals/formio-controller";
import { FormioModalFrameComponent } from "../../../../shared/components/modals/formio-modal-frame.component";

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import isEmpty from 'lodash/isEmpty';

@Component({
    selector: 'ds-task-show',
    templateUrl: '../templates/task-show.template.html'
})
export class DsTaskShowComponent extends DsBaseEntityShowComponent implements FormioController {

    entityUrlPrefix = 'tasks';
    pageTitle = 'general.menu.tasks';
    headerTitle = 'ds.microservices.entity.types.task';
    backLink = new Link(['../../list'], 'general.list');
    authUser: User;

    formioModal: NgbModalRef;
    iFrameModalComponent: FormioModalFrameComponent;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService,
                auth: AuthService,
                protected formioApiService: FormioApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
        this.authUser = auth.getAuthUser();
        this.formioApiService.setEntityApiService(entityApiService);
    }

    ngOnInit() {
        // Hide the `edit` button
        this.actions = this.actions.map((action: any) => {
            switch (action.name) {
                case 'edit':
                    action.visible = false;
                    break;
                case 'delete':
                    action.visible = false;
                    break;
            }

            return action;
        });

        // Add the `activate` action
        this.actions.push(
            {
                name: 'activate',
                title: 'ds.microservices.entity.action.activate',
                class: 'btn btn-primary btn-with-icon',
                // iconClass: 'ion-power',
                visible: true,
                // routerLink: ['../activate'],
                region: 'header',
            },
            {
                name: 'claim',
                title: 'ds.microservices.entity.action.claim',
                class: 'btn btn-default btn-with-icon',
                // iconClass: 'ion-power',
                visible: false,
                region: 'header',
            },
            {
                name: 'unclaim',
                title: 'ds.microservices.entity.action.unclaim',
                class: 'btn btn-default btn-with-icon',
                // iconClass: 'ion-power',
                visible: false,
                region: 'header',
            },
        );

        super.ngOnInit();
    }

    /**
     * Depending on the Task assignee (identity) setting, show either `Claim` or `Unclaim` action.
     * Already claimed tasks cannot be reclaimed unless unclaimed first.
     * Only users with proper permissions can unclaim tasks, but that is left up to the API to decide.
     * @returns {Observable<R>}
     */
    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;
            // let userIdentityUuid = this.authUser.identityUuid;

            this.actions = this.actions.map(action => {
                switch (action.name) {
                    case 'claim':
                        action.visible = isEmpty(entity.identityUuid);
                        break;
                    case 'unclaim':
                        action.visible = !isEmpty(entity.identityUuid);
                        break;
                }

                return action;
            });

            return Observable.of({'entity': entity, 'entityParent': prepared.entityParent});
        });
    }


    protected handleEntityEvent(event: any): any {
        switch (event.action.name) {
            case 'activate':
                this.activateFormioForm();
                break;
            case 'claim':
                this.claimTask();
                break;
            case 'unclaim':
                this.unclaimTask();
                break;
            default:
                super.handleEntityEvent(event);
        }
    }

    protected claimTask() {
        let body = {
            "identity": this.authUser.identity,
            "identityUuid": this.authUser.identityUuid
        };

        this.entityApiService.one('tasks', this.entity.uuid).customPUT(body, 'claim').subscribe((result) => {
            const message = this.translate.instant('ds.microservices.entity.task.claimSuccess');
            this.toastr.success(message);

            // Update header actions' visibility
            this.setActionVisibility('claim', false);
            this.setActionVisibility('unclaim', true);

            // Update entity's identity
            if (result.identity) {
                this.entity.identity = result.identity;
            }
            if (result.identityUuid) {
                this.entity.identityUuid = result.identityUuid;
            }
        }, () => { // error handling
            const message = this.translate.instant('ds.microservices.entity.task.claimFailure')
            this.toastr.error(message);
        });
    }

    protected unclaimTask() {
        this.entityApiService.one('tasks', this.entity.uuid).customDELETE('claim').subscribe((result) => {
            const message = this.translate.instant('ds.microservices.entity.task.unclaimSuccess');
            this.toastr.success(message);

            // Update header actions' visibility
            this.setActionVisibility('unclaim', false);
            this.setActionVisibility('claim', true);

            // Update entity's identity
            this.entity.identity = null;
            this.entity.identityUuid = null;
        }, (error) => { // error handling
            const message = this.translate.instant('ds.microservices.entity.task.unclaimFailure')
            this.toastr.error(message);
        });
    }

    // // // Formio // // // // // // // // // // // // // // // // // // // // // // //

    protected activateFormioForm() {
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
        return this.formioApiService.getForm('tasks', this.entity.uuid);
    }

    submitFormioForm(formData: any): Observable<any> {
        return this.formioApiService.submitFormUsingPut('tasks', this.entity.uuid, formData, 'submission').flatMap(submissionResult => {
            this.formioModal.close();
            this.toastr.success(this.translate.instant('ds.microservices.entity.task.submissionSuccess'));
            return Observable.of(submissionResult);
        });
    }

    handleFormioFormEvent(lifeCycleMethod: string, arg: any) {
        // Do nothing
    }

}
