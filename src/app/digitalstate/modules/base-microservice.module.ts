import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppState } from '../../app.service';
import { NgaModule } from '../../theme/nga.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormioModule } from 'ng2-formio';

import { MicroserviceConfig, MicroserviceRestangularProvider } from './microservice.provider';
// import { DsServiceComponent } from './service.component';
// import { DsServiceListComponent } from './components/list.component';
// import { DsServiceShowComponent } from './components/show.component';
// import { DsServiceCreateComponent } from './components/create.component';
// import { DsServiceEditComponent } from './components/edit.component';
// import { DsServiceActivateComponent } from './components/activate.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        FormioModule,
        NgxDatatableModule,
    ],
    declarations: [
        // DsServiceComponent,
        // DsServiceListComponent,
        // DsServiceShowComponent,
        // DsServiceCreateComponent,
        // DsServiceEditComponent,
        // DsServiceActivateComponent,
    ],
    providers: [
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})

export abstract class DsBaseMicroserviceModule {


    public microserviceName: string = null;

    // set the Microservice config in the constructor
    constructor(protected appState: AppState,
                protected msConfig: MicroserviceConfig) {

        msConfig.name = this.getMicroserviceName();
        msConfig.settings = this.appState.get('microservices')[msConfig.name];

    }

    /**
     * Override this value in child modules and provide the microservice's name.
     * return {string}
     */
    abstract getMicroserviceName(): string;
}
