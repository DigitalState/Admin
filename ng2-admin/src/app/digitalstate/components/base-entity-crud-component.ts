import { Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';

import { DsBaseEntityApiService } from '../services/base-entity-api.service';
import { Link } from '../models/Link';

import 'rxjs/Rx';
import { Subscriber} from 'rxjs/Subscriber';

export abstract class DsEntityCrudComponent {

    protected entity;

    /**
     * The URL portion of the REST resource URL that refers to the entity's collection.
     * @type {string}
     */
    protected entityUrlPrefix: string;

    protected backLink: Link;
    protected headerTitle: string;

    /**
     * The parent entity object (if any). This applies when the subclassing component targets
     * an entity that is at the `many` end of a one-to-many relationship with the parent entity.
     */
    protected entityParent;
    protected entityParentUrlPrefix: string;

    /**
     * The Router parameter that points to the value of the entity parent's identifier.
     */
    protected entityParentUrlParam: string;

    /**
     * The Enity API service is not injected into this base component class because
     * the API service configurations are Microservice-specific.
     */
    protected entityApiService: DsBaseEntityApiService<any>;

    protected translate: TranslateService;
    protected router: Router;
    protected route: ActivatedRoute;
    protected location: Location;
    protected toastr: ToastsManager;

    constructor(protected injector: Injector) {
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.location = injector.get(Location);
        this.translate = injector.get(TranslateService);
        this.toastr = injector.get(ToastsManager);
    }

    /**
     * For subclasses to be notified of the completion of entity preparation.
     */
    protected generateBackLink() {
        if (this.entityParent
            && this.entityParent.hasOwnProperty('title')
            && this.entityParent.title.hasOwnProperty(this.translate.currentLang)) {

            this.backLink = new Link;
            this.backLink.routerLink = ['/', 'pages', this.entityParentUrlPrefix, this.entityParent.uuid, 'show'];
            this.backLink.text = this.entityParent.title[this.translate.currentLang];
        }
    }

    protected getEmptyBackLink(): Link {
        return new Link;
    }
}