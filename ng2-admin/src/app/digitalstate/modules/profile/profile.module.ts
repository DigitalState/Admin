import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LaddaModule } from 'angular2-ladda';


import { routing } from './routing';
import { EntityApiService, IdentityApiService } from './entity-api.service';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../../shared/providers/microservice.provider';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsProfileComponent } from './components/profile.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        LaddaModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsProfileComponent,
    ],
    providers: [
        EntityApiService,
        IdentityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsProfileModule {

}
