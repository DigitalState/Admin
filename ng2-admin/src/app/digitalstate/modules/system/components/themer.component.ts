import { Component, Injector, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, AbstractControl, FormBuilder, Validators, ValidationErrors, NgForm } from '@angular/forms';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DefaultModal } from '../../../components/modals/default-modal/default-modal.component';
import { GlobalState } from '../../../../global.state';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { CmsApiService } from '../../../../shared/services/cms.service';
import { ThemerService } from '../../../../shared/services/themer.service';
import { DsPageComponent } from '../../../../shared/components/page-component';

import { AppState } from '../../../../app.service';

import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';

import merge from 'lodash/merge';
import unset from 'lodash/unset';
import assign from 'lodash/assign';
import reduce from 'lodash/reduce';
import isObject from 'lodash/isObject';
import forEach from 'lodash/forEach';
import { MdOption, MdSelect } from '@angular/material';


@Component({
    selector: 'ds-system',
    templateUrl: '../templates/themer.template.html',
    styleUrls: ['../styles/themer.scss'],
})
export class DsThemerComponent extends DsPageComponent {

    @ViewChild('formRef') formRef: NgForm;
    @ViewChild('appSelect') appSelect: MdSelect;


    protected pageTitle = 'general.menu.themeEditor';

    protected routeParams: Params;

    /** The ID of the this running SPA */
    protected spaId: string;

    /** SPAs to have themes configured for by this component */
    protected apps: {[key: string]: string } = {
        'admin': 'Admin',
        'portal': 'Portal'
    };

    protected app: string;

    /** Color Scheme Presets */
    protected colorSchemes: any;

    /** Form controls */
    protected form: FormGroup;

    /** Data */
    protected metadata: any = {
        'meta': {
            'version': 1.0,
        },
    };

    protected themeDefaults: any = {
        'global': {
            'bgColor': '',
            'textColor': '',
            'colorScheme': 'light',
        },
        'header': {
            'bgColor': '',
            'textColor': '',
            'linkHoverColor': null,
            'dropdownBgColor': '',
            'dropdownTextColor': '',
            'dropdownHighlight': '',
            'showProfilePic': true,
            'logoMaxWidth': 255,   // Desktop
            'logoMaxWidthSm': 225, // Mobile
        },
        'sidebar': {
            'bgColor': null,
            'textColor': null,
            'linkHoverColor': null,
        },
        'auth': {
            'formBgColor': null,
            'formTextColor': null,
        },
    };

    protected theme: any;
    protected themeNotFound: boolean = false;


    /** Constructor */
    constructor(protected injector: Injector,
                protected router: Router,
                protected route: ActivatedRoute,
                protected location: Location,
                protected fb: FormBuilder,
                protected translate: TranslateService,
                protected toastr: ToastsManager,
                protected modal: NgbModal,
                protected appState: AppState,
                protected cms: CmsApiService,
                protected themer: ThemerService) {
        super(injector);

        this.spaId = this.appState.get('config').spaId;
        this.colorSchemes = themer.getColorSchemes();

        this.form = fb.group({
            'global': fb.group({
                'bgColor': [this.themeDefaults.global.bgColor],
                'textColor': [this.themeDefaults.global.textColor],
                'colorScheme': [this.themeDefaults.global.colorScheme],
            }),
            'header': fb.group({
                'bgColor': [this.themeDefaults.header.bgColor],
                'textColor': [this.themeDefaults.header.textColor],
                'linkHoverColor': [this.themeDefaults.sidebar.linkHoverColor],
                'dropdownBgColor': [this.themeDefaults.header.dropdownBgColor],
                'dropdownTextColor': [this.themeDefaults.header.dropdownTextColor],
                'dropdownHighlight': [this.themeDefaults.header.dropdownHighlight],
                'showProfilePic': [this.themeDefaults.header.showProfilePic],
                'logoMaxWidth': [this.themeDefaults.header.logoMaxWidth],
                'logoMaxWidthSm': [this.themeDefaults.header.logoMaxWidthSm],
            }),
            'sidebar': fb.group({
                'bgColor': [this.themeDefaults.sidebar.bgColor],
                'textColor': [this.themeDefaults.sidebar.textColor],
                'linkHoverColor': [this.themeDefaults.sidebar.linkHoverColor],
            }),
            'auth': fb.group({ // Login and Registration
                'formBgColor': [this.themeDefaults.auth.formBgColor],
                'formTextColor': [this.themeDefaults.auth.formTextColor],
            }),
        });
    }

    ngOnInit() {
        super.ngOnInit();

        this.route.params.subscribe((params: Params) => {
            this.routeParams = params;
            this.app = params['app'] && this.apps.hasOwnProperty(params['app'])
                ? params['app']
                : this.spaId;

            this.themer.loadTheme(this.themer.getSpaThemeKey(this.app)).subscribe(entity => {

                // Extract the form values from the theme Data entity
                // @Fixme @workaround: The hardcoded `en` property below in entity `data` object is used due to the translation requirement of the backend API.
                if (entity && entity.data) {
                    let fetchedThemeData = entity.data['en'];

                    // Omit properties that are not part of the form values
                    unset(fetchedThemeData, 'meta');

                    // Set the theme model (form value source) from merged properties of fetched and default theme object
                    this.theme = merge({}, this.themeDefaults, fetchedThemeData);
                    this.form.setValue(this.theme);
                    this.themeNotFound = false;
                }
                else {
                    this.form.reset();
                    this.themeNotFound = true;
                }

            }, (error) => {
                this.onThemeLoadError(error);
            });

        });
    }

    /**
     * Control value getter
     * @param controlName
     * @return {any}
     */
    protected getControlValue(controlName: string): any {
        return this.form.get(controlName).value;
    }

    /**
     * Control value setter
     * @param controlName
     */
    protected setControlValue(controlName: string, value: any) {
        this.form.get(controlName).setValue(value);

        // Color-picker widget does not mark the input field as `dirty`, so we do it manually
        this.form.get(controlName).markAsDirty();
    }

    /**
     * Check whether control has errors
     * @param controlName
     * @return {boolean}
     */
    protected controlHasErrors(controlName: string): boolean {
        let control = this.form.get(controlName);
        return control.errors && control.dirty;
    }

    /**
     * Return control errors
     * @param controlName
     * @return {ValidationErrors|null}
     */
    protected getControlErrors(controlName: string): ValidationErrors | null {
        let control = this.form.get(controlName);
        return control.errors;
    }

    /**
     * Form submission handler
     * @param formValue
     */
    protected submit(formValue: any) {
        const themeData = merge({}, formValue, this.metadata);
        this.themer.saveTheme(this.themer.getSpaThemeKey(this.app), themeData).subscribe(response => {
            this.onThemeSave(formValue, response);
        }, (error) => {
            this.onThemeSaveError(error);
        });
    }

    /**
     * Reload entire application (browser window)
     */
    protected reloadTheme() {
        // window.location.reload();
        this.themer.reloadTheme();
    }

    /**
     * Handler of `change` event of the app selection dropdown.
     * @param selection
     */
    protected onAppSelectionChanged(selection: any) {
        const targetUrl = `/pages/settings/themer/${selection}`;

        if (this.form.dirty) {
            this.createConfirmationModal().then((modalResult) => {
                if (modalResult && modalResult.command === 'yes') {
                    this.router.navigateByUrl(targetUrl);
                }
                else {
                    this.app = this.routeParams['app'];
                }
            }, (modalRejection) => { // handle the case where the user naturally exits the modal dialog
                this.app = this.routeParams['app'];
            });
        }
        else {
            this.router.navigateByUrl(targetUrl);
        }
    }

    /**
     * Helper method to build the modal dialog to confirm navigating away from the form when it contains unsaved data
     * @return {Promise<any>}
     */
    protected createConfirmationModal(): Promise<any> {
        const modal = this.modal.open(DefaultModal, {size: 'lg'});
        modal.componentInstance.modalHeader = this.translate.instant('ds.microservices.entity.action.confirm');
        modal.componentInstance.modalContent = this.translate.instant('ds.messages.formNotSavedPrompt');
        modal.componentInstance.actions = [
            { command: 'yes', label: 'ds.microservices.entity.action.yes' },
            { command: 'no', label: 'ds.microservices.entity.action.no' },
        ];

        return modal.result;
    }

    /**
     * Theme load error handler
     *
     * @param error
     */
    protected onThemeLoadError(error: any) {
        console.error('There was an error loading entity', error);
        let errorTitle = this.translate.instant('ds.messages.entityNotFound');
        let errorMessage = '';

        if (error.data && error.data['hydra:description']) {
            errorMessage = error.data['hydra:description'];
        }

        this.toastr.error(errorMessage, errorTitle);
    }

    /**
     * Theme save success handler
     *
     * @param response
     */
    protected onThemeSave(formValue: any, response: any) {
        this.toastr.success(this.translate.instant('ds.messages.entitySaveSucceeded'));
        this.form.reset(formValue);
    }

    /**
     * Theme save error handler
     *
     * @param error
     */
    protected onThemeSaveError(error: any) {
        console.error('There was an error saving entity', error);
        let errorTitle = error.title
            ? this.translate.instant(error.title)
            : this.translate.instant('ds.messages.entitySaveFailed');
        let errorMessage = error.message
            ? this.translate.instant(error.message)
            : '';

        if (error.data && error.data['hydra:description']) {
            errorMessage += ' ' + error.data['hydra:description'];
        }

        this.toastr.error(errorMessage, errorTitle);
    }

}
