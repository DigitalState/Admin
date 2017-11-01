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
import { DsIdentityComponent } from './identity.component';
import { DsBusinessUnitListComponent, DsOrganizationListComponent, DsIdentityListComponent, DsIndividualListComponent, DsStaffListComponent, DsAnonymousListComponent } from './components/identity-list.component';
import { DsBusinessUnitShowComponent, DsOrganizationShowComponent, DsIdentityShowComponent, DsIndividualShowComponent, DsStaffShowComponent, DsAnonymousShowComponent } from './components/identity-show.component';
import { DsBusinessUnitCreateComponent, DsOrganizationCreateComponent, DsIdentityCreateComponent, DsIndividualCreateComponent, DsStaffCreateComponent, DsAnonymousCreateComponent } from './components/identity-create.component';
import { DsBusinessUnitEditComponent, DsOrganizationEditComponent, DsIdentityEditComponent, DsIndividualEditComponent, DsStaffEditComponent, DsAnonymousEditComponent } from './components/identity-edit.component';
import { DsPersonaListComponent } from './components/persona-list.component';
import { DsPersonaShowComponent } from './components/persona-show.component';
import { DsPersonaCreateComponent } from './components/persona-create.component';
import { DsPersonaEditComponent } from './components/persona-edit.component';

export const MICROSERVICE_NAME = 'identities';

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
        DsIdentityComponent,
        DsBusinessUnitListComponent, DsOrganizationListComponent, DsIndividualListComponent, DsIdentityListComponent, DsIndividualListComponent, DsStaffListComponent, DsAnonymousListComponent,
        DsBusinessUnitShowComponent, DsOrganizationShowComponent, DsIndividualShowComponent, DsIdentityShowComponent, DsIndividualShowComponent, DsStaffShowComponent, DsAnonymousShowComponent,
        DsBusinessUnitCreateComponent, DsOrganizationCreateComponent, DsIndividualCreateComponent, DsIdentityCreateComponent, DsIndividualCreateComponent, DsStaffCreateComponent, DsAnonymousCreateComponent,
        DsBusinessUnitEditComponent, DsOrganizationEditComponent, DsIndividualEditComponent, DsIdentityEditComponent, DsIndividualEditComponent, DsStaffEditComponent, DsAnonymousEditComponent,
        DsPersonaListComponent,
        DsPersonaShowComponent,
        DsPersonaCreateComponent,
        DsPersonaEditComponent,
    ],
    providers: [
        EntityApiService,
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsIdentityModule extends DsBaseMicroserviceModule {

    getMicroserviceName() {
        return MICROSERVICE_NAME;
    }
}
