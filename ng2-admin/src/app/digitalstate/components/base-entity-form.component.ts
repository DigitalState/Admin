import { Injector } from '@angular/core';
import { Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DsStaticTranslationService } from '../../shared/services/static-translation.service';
import { AuthService } from '../../shared/modules/auth/auth.service';
import { DsBaseEntityApiService } from '../../shared/services/base-entity-api.service';
import { MicroserviceConfig } from '../../shared/providers/microservice.provider';
import { DsEntityCrudComponent } from '../../shared/components/base-entity-crud-component';

import { DefaultModal } from './modals/default-modal/default-modal.component';
import { Link } from '../models/link';

import 'rxjs/Rx';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';

import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';


const VALIDATION_TRANS_PREFIX = 'ds.microservices.entity.validation.';

export abstract class DsBaseEntityFormComponent extends DsEntityCrudComponent {

    entityForm: NgForm;
    currentForm: NgForm;

    entity: any;
    entityParent: any;
    headerTitle: string = '';
    headerSubtitle: string = '';

    /**
     * Whether or not the entity is considered new. This is normally used to determine if the form is used to create or
     * edit an existing entity.
     */
    isNew: boolean;

    protected submitted: boolean = false;
    protected formErrors = {};

    /**
     *
     */
    protected urlParams: Params;

    /**
     * The URL portion of the REST resource URL that refers to the entity's collection.
     * @type {string}
     */
    protected entityUrlPrefix: string;

    /**
     * The entity's identifier.
     */
    protected id: any;

    /**
     * A shortcut to the entity's metadata from the MicroserviceConfig.
     * This is basically the object keyed as `properties` under the entity
     * settings.
     */
    protected entityMetadata = {};

    /**
     * The Enity API service is not injected into this base component class because
     * the API service configurations are Microservice-specific.
     */
    protected entityApiService: DsBaseEntityApiService<any>;

    /**
     * Translation services
     */
    protected translate: TranslateService;
    protected staticTranslate: DsStaticTranslationService

    protected modal: NgbModal;

    /**
     * Auth service
     */
    protected auth: AuthService;

    /**
     * Language-change stream subscriber
     */
    protected languageChangeSubscriber: Subscriber<LangChangeEvent>;

    /**
     * Alias for the current interface language. Ex: `en`, `fr`, ec...
     */
    protected lang: string;

    /**
     * Alias for the current form language. Ex: `en`, `fr`, ec...
     */
    protected formLang: string;

    /**
     * A list of supported form translations. This defaults to all translations supported by the UI.
     */
    protected formLanguages: Array<string>;

    /**
     * Based on form state, use this to determine whether language switching is enabled at any moment.
     */
    protected canSwitchLanguage: boolean = true;

    /**
     * Reset the form with a new entity AND restore 'pristine' class state by toggling 'active'
     * flag which causes the form to be removed/re-added in a tick via NgIf
     * TODO: Workaround until NgForm has a reset method (#6822)
     */
    protected active = true;

    /**
     * Set when route params are available
     */
    protected routeParams: Params;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig) {

        super(injector);
        this.auth = injector.get(AuthService);
        this.staticTranslate = injector.get(DsStaticTranslationService);
        this.modal = this.injector.get(NgbModal);
    }

    ngOnInit() {
        super.ngOnInit();

        this.loadEntityMetaData();
        this.lang = this.translate.currentLang;

        // Load default form translations from the Translation service's supported languages
        this.formLanguages = this.translate.getLangs();

        // Subscribe to language-change events
        this.languageChangeSubscriber = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            // this.prepareEntity();
            this.lang = this.translate.currentLang;

            // For entities that have parent UUIDs in the URL, generate the back-link when UI language changes
            this.prepareEntityParent();
        });

        // Setup form errors object with empty messages
        Object.keys(this.entityMetadata).forEach((propertyName) => {
            this.formErrors[propertyName] = '';
        });

        // Subscribe to current translation to make sure formLang is sent only when translations are ready
        // this.translate.getTranslation(this.translate.currentLang).subscribe(() => {
        //     this.formLang = this.translate.currentLang;
        // });

        this.route.params.subscribe((params: Params) => {
            this.urlParams = params;

            // Set form language to UI language if not passed explicitly in the URL
            this.formLang = params['formLang'] || this.lang;

            // Check if the formLang is NOT already loaded in Translations, request it from
            // the Translation service before preparing the entity
            // let formTranslationsObservable = Observable.if(
            //     () => this.translate.translations.hasOwnProperty(this.formLang), // condition
            //     Observable.of(this.translate.translations[this.formLang]), // .. then
            //     this.translate.getTranslation(this.formLang) // .. else
            // );
            //
            // formTranslationsObservable.subscribe(() => {
            //     this.prepareEntity().subscribe();
            // });

            this.translate.getTranslation(this.formLang).subscribe(() => {
                this.prepareEntity().subscribe();
            });
        });

    }

    ngOnDestroy() {
        // Unsubscribe from language-change events
        if (this.languageChangeSubscriber) {
            this.languageChangeSubscriber.unsubscribe();
        }
    }

    /**
     * Override this method to manipulate the entity meta-data that is loaded from `microservices.ts`.
     */
    protected loadEntityMetaData(): void {
        this.entityMetadata = this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties;
    }

    protected onRouteParams(params: Params) {
        this.routeParams = params;
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {

        // return this.route.params.flatMap((params: Params) => {
            let uuid = this.urlParams['id'];
            let parentUuid = this.urlParams[this.entityParentUrlParam];

            this.onRouteParams(params);

            if (this.isNew) {
                return this.createBlankEntity().flatMap(entity => {
                    this.entity = entity;

                    return this.prepareEntityParent(this.entityParentUrlPrefix, parentUuid).flatMap(entityParent => {
                        return Observable.of({'entity': entity, 'entityParent': entityParent});
                    });
                });
            }
            else {
                return this.entityApiService.getOne(this.entityUrlPrefix, uuid).flatMap(entity => {
                    this.entity = entity;

                    return this.prepareEntityParent(this.entityParentUrlPrefix, parentUuid).flatMap(entityParent => {
                        return Observable.of({'entity': entity, 'entityParent': entityParent});
                    });
                });
            }
        // });

    }

    protected prepareEntityParent(urlPrefix?: string, urlParam?: string): Observable<any> {
        if (this.entityParent) {
            this.generateBackLink();
            return Observable.of(this.entityParent);
        }
        else if (urlPrefix && urlParam) {
            return this.entityApiService.getOne(urlPrefix, urlParam).flatMap(entityParent => {
                this.entityParent = entityParent;
                this.generateBackLink();
                return Observable.of(entityParent);
            });
        }
        else { // Root entity (has no parent)
            // Build backlink to point the  `list` component
            this.generateListBackLink();
            return Observable.of(null);
        }
    }

    /**
     * Build backlink to point the `list` component. The list path is relative
     * and it depends on the form type (create vs. edit) and whether a language
     * suffix is present at the end of the current path.
     */
    protected generateListBackLink(): Link {
        const currentPath = this.location.path();
        this.backLink = new Link;
        this.backLink.text = 'general.list';

        if (/\/create$/.test(currentPath)) {
            this.backLink.routerLink = ['../list'];
        }
        else if (/\/create\/.{2}$/.test(currentPath)) {
            this.backLink.routerLink = ['../../list'];
        }
        else if (/\/edit$/.test(currentPath)) {
            this.backLink.routerLink = ['../../list'];
        }
        else if (/\/edit\/.{2}$/.test(currentPath)) {
            this.backLink.routerLink = ['../../../list'];
        }
        else {
            this.backLink.routerLink = ['../../../list'];
        }

        return this.backLink;
    }

    /**
     * Build a skeleton of an entity with all properties from its metadata.
     * Subclasses can override this method to customize the resulting entity.
     */
    protected createBlankEntity(): Observable<any> {
        // Create an entity with default properties that are not part of the entity's meta-model.
        let user = this.auth.getAuthUser();
        let entity = {
            // 'owner': user.identity,
            // 'ownerUuid': user.identityUuid,
            'owner': 'BusinessUnit',
            'ownerUuid': '8454c987-cbc5-4a24-ba1a-d420283caabd',
            'weight': 0,
            'version': 1,
        };

        Object.keys(this.entityMetadata).forEach((propertyName, prop) => {
            let property = this.entityMetadata[propertyName];
            let defaultValue = property.hasOwnProperty('default') ? property.default : '';

            // Determine whether to populate the property as a translated value
            if (property.hasOwnProperty('translated') && property.translated === true) {
                entity[propertyName] = {};
                this.translate.langs.forEach((lang) => {
                    entity[propertyName][lang] = defaultValue;
                });
            }
            else {
                entity[propertyName] = defaultValue;
            }
        });

        return Observable.of(entity);
    }

    displayFormErrors(checkCleanControls: boolean = true) {
        if (!this.entityForm) {
            return;
        }

        const form = this.entityForm.form;
        this.canSwitchLanguage = form.pristine;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && (control.dirty || checkCleanControls) && !control.valid) {
                // const validation = this.entityMetadata[field].validation
                for (const key in control.errors) {
                    this.setFormError(field, key);
                    // let params = validation[key].hasOwnProperty('params') ? validation[key].params : null;
                    // let message = this.translate.instant(VALIDATION_TRANS_PREFIX + validation[key].message, params);
                    // this.formErrors[field] += message + ' ';
                }
            }
        }
    }

    onFormInit(form: NgForm) {
        this.currentForm = form;
    }

    onFormChange(form: NgForm) {
        if (this.currentForm === this.entityForm) {
            return;
        }

        this.entityForm = this.currentForm;
        if (this.entityForm) {
            this.entityForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    onFormCancel() {
        this.location.back();
    }

    /**
     * Called upon an attempt to switch the form language.
     * @param newLanguage
     */
    onFormLanguageChange(newLanguage: string) {
        // this.formLang = newLanguage.key;
        // console.log('newLanguage', newLanguage, 'formLang', this.formLang);

        // Warn the user if the form is dirty before navigating to the new language
        if (this.entityForm.dirty) {
            this.buildConfirmationModal('ds.messages.confirmUnsavedForm', 'general.confirm').then((modalResult) => {
                if (modalResult && modalResult.command === 'yes') {
                    this.navigateToFormLanguage(newLanguage, this.formLang);
                }
            }, () => {}); // this is here to catch promise rejection error and ignore it
        }
        else {
            this.navigateToFormLanguage(newLanguage, this.formLang);
        }
    }

    /**
     * Issues the routing command to navigate to another form language after clearing some
     * local form and entity states.
     *
     * @param newFormLang
     * @param oldFormLang
     */
    protected navigateToFormLanguage(newFormLang: string, oldFormLang: string) {
        const newPath = this.getFormLanguagePath(newFormLang, oldFormLang);

        this.entityForm.reset();
        this.entity = null;
        this.router.navigateByUrl(newPath, { replaceUrl: true });
    }

    /**
     * Determines the path to a form language based on current location path, old and new
     * language to navigate to.
     *
     * @param newFormLang
     * @param oldFormLang
     * @return {string}
     */
    protected getFormLanguagePath(newFormLang: string, oldFormLang: string): string {
        let newPath: string;
        const oldPath = this.location.path();

        // Check whether the old path ends with a language key so we can replace it with the new one
        if (new RegExp('/' + oldFormLang + '$').test(oldPath)) {
            newPath = oldPath.replace(new RegExp('\/' + oldFormLang + '$'), '\/' + newFormLang);
        }
        else { // otherwise just append the new language key to the path
            newPath = oldPath + '/' + newFormLang;
        }

        return newPath;
    }

    onFormSubmit(form: NgForm) {
        if (!form.valid) {
            this.displayFormErrors();
            this.toastr.error(this.translate.instant('ds.messages.formInvalid'));
            return false;
        }

        this.submitted = true;
        if (this.isNew) {
            this.saveNewEntity(form);
        }
        else {
            this.saveExistingEntity(form);
        }
    }

    onValueChanged(data?: any) {
        // Validate form controls while ignoring clean controls
        this.displayFormErrors(false);
    }

    saveNewEntity(form?: NgForm) {
        try {
            let sanitizedEntity = this.preSave(cloneDeep(this.entity));
            this.entityApiService.resource(this.entityUrlPrefix).post(sanitizedEntity).subscribe((response) => {
                this.onEntitySave(response);
            }, (error) => {
                this.onEntitySaveError(error);
            });
        }
        catch (e) {
            console.warn('Error in saveNewEntity', e);
        }
    }

    saveExistingEntity(form: NgForm) {
        try {
            let plainEntity = cloneDeep(this.entity.plain());
            let sanitizedEntity = this.preSave(plainEntity);
            let resource = this.entityApiService.resource(this.entityUrlPrefix);
            let headers = { 'Content-Type': 'application/json' };

            resource.customPUT(sanitizedEntity, this.entity.uuid, undefined, headers).subscribe((response) => {
                this.onEntitySave(response);
            }, (error) => {
                this.onEntitySaveError(error);
            });
        }
        catch (e) {
            console.warn('Error in saveExistingEntity', e);
        }
    }

    /**
     * Sanitizes the provided `entity` and returns it to the caller.
     * It's best to pass a clone of the original `entity` to avoid data binding issues that me appear in the form.
     *
     * @param entity
     * @returns {any}
     */
    preSave(entity): any {
        const propertiesToRemove = this.getPropertiesToRemoveOnSave();
        entity = omit(entity, propertiesToRemove);
        // Remove property if it's read only
        // propertiesToRemove.forEach((propertyName) => {
        //     if (entity.hasOwnProperty(propertyName)) {
        //         delete entity[propertyName];
        //     }
        // });

        // Strip out empty (yet required) language-based properties that may fail validation.
        Object.keys(this.entityMetadata).forEach((propertyName, prop) => {
            let property = this.entityMetadata[propertyName];

            // Skip read-only properties
            if (propertiesToRemove.indexOf(propertyName) > -1) {
                return;
            }

            if (property.hasOwnProperty('translated') && property.translated === true) {
                this.formLanguages.forEach((lang) => {

                    // Only allow properties translated in the current form language
                    if (lang !== this.formLang) {
                        delete entity[propertyName][lang];
                        return;
                    }

                    // if (entity[propertyName] && isString(entity[propertyName][lang]) && isEmpty(entity[propertyName][lang])) {
                    //     delete entity[propertyName][lang];
                    // }

                    // Convert JSON properties from strings to JSON objects
                    if (property.hasOwnProperty('type') && property.type === 'json') {
                        try {
                            if (isString(entity[propertyName][lang])) {
                                if (entity[propertyName][lang].trim().length === 0) {
                                    entity[propertyName][lang] = '{}';
                                }
                                entity[propertyName][lang] = JSON.parse(entity[propertyName][lang]);
                            }
                        }
                        catch (e) {
                            this.setFormError(propertyName, 'json');
                            throw {
                                'type': 'validation',
                                'property': propertyName,
                                'field': property.type,
                                'language': lang
                            };
                        }
                    }
                });
            }
            else {
                // Convert JSON properties from strings to JSON objects
                if (isString(entity[propertyName]) && property.hasOwnProperty('type') && property.type === 'json') {
                    entity[propertyName] = JSON.parse(entity[propertyName]);
                }
            }
        });

        console.log('sanitized entity', entity);
        return entity;
    }

    /**
     * This method is called prior to saving an entity to get a list of properties to omit. Subclasses can override
     * but make sure to call the super method first.
     *
     * @returns Array<string>
     */
    getPropertiesToRemoveOnSave(): Array<string> {
        return [
            '@context',
            '@id',
            '@type',
            'id',
            'uuid',
            'createdAt',
            'updatedAt',
            'deletedAt',
        ];
    }

    setFormError(propertyName, validationKey) {
        const validation = this.entityMetadata[propertyName].validation;
        let params = validation[validationKey].hasOwnProperty('params') ? validation[validationKey].params : null;
        let translationKey = VALIDATION_TRANS_PREFIX + validation[validationKey].message;
        let message = this.staticTranslate.instant(this.formLang, translationKey, params);
        this.formErrors[propertyName] += message + ' ';
    }

    getRoutingUrlOnSave(response: any): any {
        const currentPath = this.location.path();
        const search = this.isNew ? /\/create.*$/ : /\/edit.*$/;
        const replacement = this.isNew ? '/' + response.uuid + '/show' : '/show';
        let url = currentPath.replace(search, replacement);

        // let relativeUrl = this.isNew ? '../' + response.uuid : '../';
        // return [relativeUrl, 'show'];
        return url;
    }

    onEntitySave(response) {
        console.log('Entity saved successfully, server response: ', response);
        this.toastr.success(this.translate.instant('ds.messages.entitySaveSucceeded'));

        // const routerLink = this.isNew ? '../list' : '../show';
        if (response.uuid) {
            let routingUrl = this.getRoutingUrlOnSave(response);

            // Use a navigation method based on the type of the returned routing URL
            if (routingUrl.indexOf('/') === 0) { // absolute URL
                this.router.navigateByUrl(routingUrl);
            }
            else { // relative URL
                this.router.navigate(routingUrl, { relativeTo: this.route });
            }
        }
        else {
            this.toastr.error(this.translate.instant('ds.messages.unexpectedError'));
        }
    }

    onEntitySaveError(error: any) {
        console.error('There was an error saving entity', error);
        let errorTitle = this.translate.instant('ds.messages.entitySaveFailed');
        let errorMessage = '';

        if (error.data && error.data['hydra:description']) {
            errorMessage = error.data['hydra:description'];
            // setTimeout(() => {
            //     this.toastr.info(this.translate.instant('ds.messages.ensureFormValid'));
            // }, 500);
        }

        this.toastr.error(errorMessage, errorTitle);
    }

    /**
     * Builds a generic confirmation modal box and returns it's result so the caller can assign actions
     * to perform when the box is closed.
     * @param content
     * @param title
     * @return {Promise<any>}
     */
    protected buildConfirmationModal(content: string, title?: string): Promise<any> {
        const modal = this.modal.open(DefaultModal, {size: 'sm'});
        modal.componentInstance.modalHeader = title || 'general.confirm';
        modal.componentInstance.modalContent = content;
        modal.componentInstance.actions = [
            { command: 'yes', label: 'general.yes' },
            { command: 'no', label: 'general.no' },
        ];

        return modal.result;
    }
}
