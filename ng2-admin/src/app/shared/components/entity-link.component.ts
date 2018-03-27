import { Component, Input } from '@angular/core';

import { LocalApiUtils } from '../../digitalstate/utils/local-api.utils';
import { EntityApiService } from '../services/entity.service';

import { Observable } from 'rxjs/Observable';

import find from 'lodash/find';

@Component({
    selector: 'entity-link',
    template:
        `<a [routerLink]="entityLink?.routerLink">
            <span class="entity-type">{{ entityType }}</span>
        </a>`,
})
export class EntityLinkComponent {

    @Input() protected entityType: string;
    @Input() protected entityUuid: string;
    @Input() protected language: string;

    /**
     * The Entity entity used to render the title
     */
    protected entity: any;
    protected entityLink: { routerLink: Array<string>, title: any };

    ngOnInit() {
        this.entityLink = LocalApiUtils.createEntityLink(this.entityType, this.entityUuid);
    }
}