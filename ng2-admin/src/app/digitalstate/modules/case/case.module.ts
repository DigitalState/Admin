import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../../shared/providers/microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsCaseComponent } from './case.component';
import { DsCaseListComponent } from './components/case-list.component';
import { DsCaseShowComponent } from './components/case-show.component';
import { DsCaseCreateComponent } from './components/case-create.component';
import { DsCaseEditComponent } from './components/case-edit.component';
import { DsCaseStatusListComponent } from './components/status-list.component';
import { DsCaseStatusShowComponent } from './components/status-show.component';
import { DsCaseStatusCreateComponent } from './components/status-create.component';
import { DsCaseStatusEditComponent } from './components/status-edit.component';

export const MICROSERVICE_NAME = 'cases';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsCaseComponent,
        DsCaseListComponent,
        DsCaseShowComponent,
        DsCaseCreateComponent,
        DsCaseEditComponent,
        DsCaseStatusListComponent,
        DsCaseStatusShowComponent,
        DsCaseStatusCreateComponent,
        DsCaseStatusEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsCaseModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
