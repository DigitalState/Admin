import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormioModule } from 'ng2-formio';

import { routing } from './service.routing';
import { DsServiceListComponent } from './components/list.component';
import { DsServiceShowComponent } from './components/show.component';
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
        DsServiceListComponent,
        DsServiceShowComponent,
        DsServiceActivateComponent,
    ]
})
export class DsServiceModule {

}
