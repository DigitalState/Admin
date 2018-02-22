import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';

import { GlobalState } from '../../../../global.state';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService, IdentityApiService } from '../entity-api.service';
import { CmsApiService } from '../../../../shared/services/cms.service';
import { DsPageComponent } from '../../../../shared/components/page-component';

import { Subscriber } from 'rxjs/Subscriber';
import assign from 'lodash/assign';
import mapValues from 'lodash/mapValues';
import reduce from 'lodash/reduce';
import isObject from 'lodash/isObject';
import forEach from 'lodash/forEach';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ds-translations',
    templateUrl: '../templates/translations.template.html',
})
export class DsTranslationsComponent extends DsPageComponent {

    protected pageTitle = 'general.menu.translations';

    translationSlugs: Array<string> = ['translation', 'admin-translation', 'portal-translation'];

    sharedTranslations: any;
    adminTranslations: any;
    portalTranslations: any;

    activeTranslations: any;

    /**
     * Account information that can be updated such as e-mail, password, etc...
     * These are submitted to the endpoint: authentication/users
     */
    identityFormData: {
        'email'?: string,
        'plainPassword'?: string
    };

    form: FormGroup;

    /*
     * Template variables
     */
    saveInProgress: boolean = false;

    constructor(protected injector: Injector,
                protected globalState: GlobalState,
                protected formBuilder: FormBuilder,
                protected translate: TranslateService,
                protected cms: CmsApiService,
                protected microserviceConfig: MicroserviceConfig,
                protected toastr: ToastsManager) {
        super(injector);

        this.buildForm();
    }

    ngOnInit() {
        super.ngOnInit();
        this.commitBreadcrumb();

        // Update page title
        setTimeout(() => {
            this.globalState.notifyDataChanged('menu.activeLink', {
                'title': 'general.menu.translations'
            });
        });

        this.activeTranslations = this.translate.translations;
        this.loadTranslations();
    }

    ngOnDestroy() {}

    buildForm() {
        let translationSlugsMap = reduce(this.translationSlugs, (collector, key) => {
            collector[key] = '';
            return collector;
        }, {});

        this.form = this.formBuilder.group(translationSlugsMap);
    }

    loadTranslations() {
        this.cms.getTranslations(this.translationSlugs, false).subscribe(datas => {
            if (isObject(datas)) {
                let datasJson = mapValues(datas, (translationObject) => JSON.stringify(translationObject, null, 2));
                this.form.setValue(datasJson);
            }
        }, () => { // error
            this.toastr.error(this.translate.instant('ds.messages.translationLoadingFailed'));
        });
    }

    reloadTranslations() {
        const langReloadObservables = this.translate.langs.map(lang => this.translate.reloadLang(lang));
        Observable.forkJoin(langReloadObservables).subscribe(() => {
            this.translate.use(this.translate.currentLang);
        });
    }

    saveTranslation(translationSlug: string) {
        this.saveInProgress = true;
        let translationValue: any;

        try {
            translationValue = JSON.parse(this.form.getRawValue()[translationSlug]);

            if (!translationValue) {
                throw new Error('ds.microservices.entity.validation.json');
            }
        }
        catch (error) {
            this.toastr.error(this.translate.instant('ds.microservices.entity.validation.json'));
            this.saveInProgress = false;
            return;
        }

        this.cms.saveTranslation(translationSlug, translationValue)
            .finally(() => {
                this.saveInProgress = false;
            })
            .subscribe((responseOk: boolean) => {
                this.toastr.success(this.translate.instant('ds.messages.translationSaveSucceeded'));
            }, (error: DsError) => { // error
                this.toastr.error(this.translate.instant(error.message), this.translate.instant(error.title));
            });
    }

}
