import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';

import { AppState } from '../app.service';
import { NgaModule } from '../../theme/nga.module';

import { DsBaseEntityApiService } from './services/base-entity-api.service';
import { DsServiceModule } from './modules/service/service.module';
import { DefaultModal } from './components/modals/default-modal/default-modal.component';

import { MICROSERVICES } from './microservices';
import { TemplateStorage } from './services/template-storage.service';
import { TemplateStorageComponent } from './components/template-storage.component';
import { DsMicroservicesComponent } from './components/microservices.component';
import { DsEntityListComponent } from './components/entity-list.component';
import { DsDatatableHeader } from './components/datatable/datatable-header.component';
import { DsDatatableCell } from './components/datatable/datatable-cell.component';
import { DsDatatableCellActions } from './components/datatable/datatable-cell-actions.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        DsMicroservicesComponent,
        DefaultModal,
        TemplateStorageComponent,
        DsEntityListComponent,
        DsDatatableHeader,
        DsDatatableCell,
        DsDatatableCellActions,
    ],
    entryComponents: [
        DefaultModal,
    ],
    providers: [
        TemplateStorage,
    ],
    exports: [
        DsMicroservicesComponent,
        DsEntityListComponent,
        DsDatatableHeader,
        DsDatatableCell,
        DsDatatableCellActions,
    ]
})
export class DsMicroservicesModule {

    constructor(private appState: AppState) {
        appState.set('microservices', MICROSERVICES);
    }

}
