import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormioModule } from '../../my-formio.module';
import { FormioModule } from 'ng2-formio';

import { NewComponent } from './new.component';
import { routing } from './new.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        FormioModule,
        NgxDatatableModule,
        routing
    ],
    declarations: [
        NewComponent,
    ]
})
export class NewModule {

}
