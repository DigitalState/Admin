import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsCasesComponent } from './cases.component';
import { DsCasesListComponent } from './components/list.component';
// import { DsCasesShowComponent } from './components/show.component';
// import { DsCasesCreateComponent } from './components/create.component';
// import { DsCasesEditComponent } from './components/edit.component';

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
        DsCasesComponent,
        DsCasesListComponent,
        // DsCasesShowComponent,
        // DsCasesCreateComponent,
        // DsCasesEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsCasesModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
