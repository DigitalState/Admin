import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';

import { AppState } from '../app.service';
import { NgaModule } from '../../theme/nga.module';

import { DsBaseEntityApiService } from './base-entity-api.service';
import { DsServiceModule } from './modules/service/service.module';
// import { DsMicroservicesComponent } from './microservices.component';
import { DefaultModal } from './components/modals/default-modal/default-modal.component';

import { MICROSERVICES } from './microservices';

@NgModule({
    imports: [
        CommonModule,
        DsServiceModule,
        RouterModule
    ],
    declarations: [
        // DsMicroservicesComponent,
        DefaultModal,
    ],
    entryComponents: [
        DefaultModal
    ],
    providers: [
        // EntityApiService
    ]
})
export class DsMicroservicesModule {

    constructor(private appState: AppState) {
        appState.set('microservices', MICROSERVICES);
    }

}
