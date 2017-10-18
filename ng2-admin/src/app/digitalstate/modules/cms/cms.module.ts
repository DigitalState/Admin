import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormioModule } from 'angular-formio';

import { DsSharedModule } from '../../../shared/shared.module';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../../shared/providers/microservice.provider';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsCmsComponent } from './cms.component';
import { DsDataListComponent } from './components/data-list.component';
import { DsDataShowComponent } from './components/data-show.component';
import { DsDataCreateComponent } from './components/data-create.component';
import { DsDataEditComponent } from './components/data-edit.component';
import { DsTextListComponent } from './components/text-list.component';
import { DsTextShowComponent } from './components/text-show.component';
import { DsTextCreateComponent } from './components/text-create.component';
import { DsTextEditComponent } from './components/text-edit.component';
import { DsPageListComponent } from './components/page-list.component';
import { DsPageShowComponent } from './components/page-show.component';
import { DsPageCreateComponent } from './components/page-create.component';
import { DsPageEditComponent } from './components/page-edit.component';
import { DsFileListComponent } from './components/file-list.component';
import { DsFileShowComponent } from './components/file-show.component';
import { DsFileCreateComponent } from './components/file-create.component';
import { DsFileEditComponent } from './components/file-edit.component';

export const MICROSERVICE_NAME = 'cms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FormioModule,
        NgxDatatableModule,
        DsSharedModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsCmsComponent,
        DsDataListComponent,
        DsDataShowComponent,
        DsDataCreateComponent,
        DsDataEditComponent,
        DsTextListComponent,
        DsTextShowComponent,
        DsTextCreateComponent,
        DsTextEditComponent,
        DsPageListComponent,
        DsPageShowComponent,
        DsPageCreateComponent,
        DsPageEditComponent,
        DsFileListComponent,
        DsFileShowComponent,
        DsFileCreateComponent,
        DsFileEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsCmsModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
