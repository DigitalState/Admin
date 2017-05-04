import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormioModule } from 'ng2-formio';

import { routing } from './service.routing';
import { DsServiceComponent } from './service.component';
import { DsServiceListComponent } from './components/list.component';
import { DsServiceShowComponent } from './components/show.component';
import { DsServiceCreateComponent } from './components/create.component';
import { DsServiceEditComponent } from './components/edit.component';
import { DsServiceActivateComponent } from './components/activate.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        FormioModule,
        NgxDatatableModule,
        routing,
    ],
    declarations: [
        DsServiceComponent,
        DsServiceListComponent,
        DsServiceShowComponent,
        DsServiceCreateComponent,
        DsServiceEditComponent,
        DsServiceActivateComponent,
    ]
})
export class DsServiceModule {

}
