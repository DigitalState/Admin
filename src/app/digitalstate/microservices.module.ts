import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';

import { NgaModule } from '../../theme/nga.module';

import { DsServiceModule } from './service/service.module';
// import { DsMicroservicesComponent } from './microservices.component';
import { DefaultModal } from './components/modals/default-modal/default-modal.component';

@NgModule({
    imports: [
        DsServiceModule,
        RouterModule
    ],
    declarations: [
        // DsMicroservicesComponent,
        DefaultModal,
    ],
    entryComponents: [
        DefaultModal
    ]
})
export class DsMicroservicesModule {

}
