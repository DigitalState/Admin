import { Component, Injector } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import { Slug } from 'ng2-slugify';
import { TranslateService } from '@ngx-translate/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

@Component({
    selector: 'ds-service-create',
    templateUrl: '../templates/service-form.template.html'
})
export class DsServiceCreateComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'services';
    headerTitle = 'ds.microservices.entity.types.service';
    backLink = new Link(['../list'], 'general.list');
    isNew = true;

    slug: Slug = null;
    autoSluggify = true;

    constructor(injector: Injector,
                translate: TranslateService,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);

        this.translate = translate;
        this.entityApiService = entityApiService;

        this.slug = new Slug('default');
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;

            try {
                if (entity.data) {
                    Object.keys(entity.data).forEach(function(key) {
                        entity.data[key] = JSON.stringify(entity.data[key], null, 2);
                    });
                }
            }
            catch(e) {
                console.warn('Error parsing incoming JSON', e)
            }

            return Observable.of({'entity': entity});
        });
    }

    /**
     * Overriding default validators to add the custom JSON validator from ng2-validation
     *
     * @param form
     */
    onFormInit(form: NgForm) {
        super.onFormInit(form);

        setTimeout(() => {
            form.controls['data'].setValidators([
                Validators.required,
                CustomValidators.json,
            ]);
        }, 0);
    }

    onValueChanged(data?: any) {
        super.onValueChanged(data);

        if (this.autoSluggify && data && isString(data.title) && !isEmpty(data.title)) {
            this.entity.slug = this.slug.slugify(data.title);
        }
    }

    // onFormLanguageChange(newLanguage) {
    //     super.onFormLanguageChange(newLanguage);
    //
    //     // Disable auto-sluggify to avoid overwriting the slug when the interface language is changed
    //     this.autoSluggify = false;
    // }
}
