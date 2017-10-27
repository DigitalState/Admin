import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { DsEntityCrudComponent } from '../../shared/components/base-entity-crud-component';

/**
 * @placeholder
 */
@Injectable()
export class DsRouteDeactivationConfirmerGuard implements CanDeactivate<DsEntityCrudComponent> {

    canDeactivate(deactivatedComponent: DsEntityCrudComponent) {
        if (deactivatedComponent && deactivatedComponent.confirmBeforeRouteDeactivation === true) {
            return window.confirm('Do you really want to cancel?');
        }
        return true;
    }

}
