import { Component } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-activate',
    template: `
        <strong>Service Activation Component -- placeholder</strong>
    `
})
export class DsServiceActivateComponent {

    constructor(private restangular: Restangular) {

    }

    ngOnInit() {

    }
}
