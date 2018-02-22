import { Component, Injector } from '@angular/core';

import { DsPageComponent } from '../../../../shared/components/page-component';


@Component({
    selector: 'ds-system',
    templateUrl: '../templates/system.template.html',
    styleUrls: ['../styles/system.scss'],
})
export class DsSystemComponent extends DsPageComponent {

    pageTitle = 'general.menu.systems';
    hostPrefix = window.location.protocol + '//' + window.location.hostname;

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        this.commitBreadcrumb();
    }
}
