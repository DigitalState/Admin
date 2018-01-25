import { Component, ElementRef, Injector } from '@angular/core';

import { NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { ApiUtils } from '../../../../shared/utils/api.utils';
import { FormioApiService } from '../../../../shared/services/formio-api.service';
import { FormioController } from "../../../../shared/components/modals/formio-controller";
import { FormioModalFrameComponent } from "../../../../shared/components/modals/formio-modal-frame.component";

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { EntityApiService } from '../entity-api.service';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import omit from 'lodash/omit';

@Component({
    selector: 'ds-scenario-show',
    templateUrl: '../templates/scenario-show.template.html'
})
export class DsScenarioShowComponent extends DsBaseEntityShowComponent implements FormioController {

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    pageTitle = 'general.menu.serviceDirectory';
    headerTitle = 'ds.microservices.entity.types.scenario';
    headerSubtitle = null;

    formioModal: NgbModalRef;
    iFrameModalComponent: FormioModalFrameComponent;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService,
                protected formioApiService: FormioApiService) {

        super(injector, microserviceConfig);
        this.entityApiService = entityApiService;
        this.formioApiService.setEntityApiService(entityApiService);

        // Create a place-holder for the back-link until it gets generated
        this.backLink = this.getEmptyBackLink();
    }

    ngOnInit() {
        // // Add the `activate` action
        // this.actions.push({
        //     name: 'activate',
        //     title: 'ds.microservices.entity.action.activate',
        //     class: 'btn btn-secondary btn-with-icon',
        //     iconClass: 'ion-power',
        //     visible: true,
        //     routerLink: ['../activate'],
        //     region: 'header',
        // });

        // Hide the `edit` button until the entity is loaded. See `prepareEntity` override below.
        this.actions = this.actions.map((action: any) => {
            switch (action.name) {
                case 'edit':
                    action.visible = false;
                    break;
            }

            return action;
        });

        super.ngOnInit();
    }

    ngOnDestroy() {
        if (this.formioModal) {
            this.formioModal.close();
        }

        super.ngOnDestroy();
    }

    /**
     * Change the route of the `edit` header action by appending the scenario's type to it.
     * @returns {Observable<R>}
     */
    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;

            this.actions = this.actions.map((action: any) => {
                switch (action.name) {
                    case 'edit':
                        action.routerLink = ['../edit', entity.type];
                        action.visible = true;
                        break;
                }

                return action;
            });

            return Observable.of({'entity': entity, 'entityParent': prepared.entityParent});
        });
    }

    /**
     * Override to get the parent's entity UUID from the entity itself if not detected int the URL.
     */
    protected prepareEntityParent(urlPrefix: string, urlParam: string): Observable<any> {
        if (!urlParam) {
            urlParam = ApiUtils.getUuidFromUri(this.entity.service);
        }
        return super.prepareEntityParent(urlPrefix, urlParam);
    }

    /**
     * After deletion, navigate back to the Service's `show` component.
     */
    navigateAfterDeletion(): void {
        this.router.navigate(['../../../show'], { relativeTo: this.route });
    }

    // // // Formio // // // // // // // // // // // // // // // // // // // // // // // //

    protected activateFormioForm(entity: any) {
        this.openModalIFrame(entity);
    }

    protected openModalIFrame(entity: any) {
        const modalOptions: NgbModalOptions = {
            size: 'lg',
            windowClass: 'formio-modal-frame',
        };

        const modalBreadcrumbsTitles = [
            this.getTranslatedPropertyValue(this.entityParent, 'title'),
            this.getTranslatedPropertyValue(entity, 'title'),
        ];

        this.formioModal = this.modal.open(FormioModalFrameComponent, modalOptions);
        this.iFrameModalComponent = this.formioModal.componentInstance;
        this.iFrameModalComponent.setFormioController(this);
        this.iFrameModalComponent.setBreadcrumbs(modalBreadcrumbsTitles);
    }

    requestFormioForm(): Observable<any> {
        return this.formioApiService.getForm('scenarios', this.entity.uuid);
    }

    submitFormioForm(formData: any): Observable<any> {
        return this.formioApiService.submitFormUsingPost('scenarios', this.entity.uuid, formData).flatMap(submissionResult => {
            this.formioModal.close();
            this.toastr.success(this.translate.instant('ds.microservices.entity.scenario.submissionSuccess'));
            return Observable.of(submissionResult);
        });
    }

    handleFormioFormEvent(lifeCycleMethod: string, arg: any) {
        // Do nothing
    }

}
