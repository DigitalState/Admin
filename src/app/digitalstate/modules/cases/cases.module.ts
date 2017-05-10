import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { NgaModule } from '../../../theme/nga.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormioModule } from 'ng2-formio';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../microservice.provider';
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
        // NgaModule,
        FormioModule,
        NgxDatatableModule,
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
