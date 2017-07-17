import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';
import { Slug } from 'ng2-slugify';
import { TranslateService } from '@ngx-translate/core';

import { MicroserviceConfig } from '../../microservice.provider';
import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';

import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

@Component({
    selector: 'ds-scenario-create',
    templateUrl: '../templates/scenario-form.template.html'
})
export class DsScenarioCreateComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'scenarios';
    entityParentUrlPrefix = 'services';
    entityParentUrlParam = 'serviceUuid';
    headerTitle = 'Add Scenario';
    isNew = true;

    slug: Slug = null;
    autoSluggify = true;

    protected routeParamsSubscription: Subscription;

    constructor(injector: Injector,
                route: ActivatedRoute,
                router: Router,
                location: Location,
                translate: TranslateService,
                toastr: ToastsManager,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);

        this.translate = translate;
        this.entityApiService = entityApiService;

        // Create a place-holder for the back-link until it gets generated
        this.backLink = this.getEmptyBackLink();

        this.slug = new Slug('default');
    }

    ngOnInit() {
        this.routeParamsSubscription = this.route.params.subscribe(params => {
            this.entityApiService.getOne(this.entityParentUrlPrefix, params[this.entityParentUrlParam]).subscribe(res => {
                this.entityParent = res;
                super.ngOnInit();
            });
        });
    }

    /**
     * Add the `Service` association to the newly created `Scenario` entity by assigning
     * the service's IRI to the `service` property.
     */
    protected createBlankEntity(): any {
        return super.createBlankEntity().flatMap(entity => {
            entity.service = '/' + this.entityParentUrlPrefix + '/' + this.entityParent.uuid;
            return Observable.of(entity);
        });
    }

    saveNewEntity(): any {
        // this.entity['data'] = JSON.parse(this.entity['data']);
        return super.saveNewEntity();
    }

    onValueChanged(data?: any) {
        super.onValueChanged(data);

        if (this.autoSluggify && data && isString(data.title) && !isEmpty(data.title)) {
            this.entity.slug = this.slug.slugify(data.title);
        }
    }

    onFormLanguageChange(newLanguage) {
        super.onFormLanguageChange(newLanguage);

        // Disable auto-sluggify to avoid overwriting the slug when the interface language is changed
        this.autoSluggify = false;
    }
}
