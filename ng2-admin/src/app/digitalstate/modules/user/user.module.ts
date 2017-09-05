import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DsSharedModule } from '../../../shared/shared.module';

import { routing } from './routing';
import { EntityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../../shared/providers/microservice.provider';
import { DsBaseMicroserviceModule } from '../base-microservice.module';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsUserComponent } from './user.component';
import { DsUserListComponent } from './components/user-list.component';
import { DsUserShowComponent } from './components/user-show.component';
import { DsUserCreateComponent } from './components/user-create.component';
import { DsUserEditComponent } from './components/user-edit.component';

export const MICROSERVICE_NAME = 'authentication';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        DsSharedModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsUserComponent,
        DsUserListComponent,
        DsUserShowComponent,
        DsUserCreateComponent,
        DsUserEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsUserModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
