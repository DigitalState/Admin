import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LaddaModule } from 'angular2-ladda';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { ColorPickerModule } from 'ngx-color-picker';

import { routing } from './routing';
import { MicroserviceConfig, MicroserviceRestangularProvider } from '../../../shared/providers/microservice.provider';
import { DsMicroservicesModule } from '../../microservices.module';
import { DsSystemComponent } from './components/system.component';
import { DsConfigurationsComponent } from './components/configurations.component';
import { DsTranslationsComponent } from './components/translations.component';
import { DsHealthComponent } from './components/health.component';
import { DsThemerComponent } from './components/themer.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        LaddaModule,
        InlineEditorModule,
        ColorPickerModule,
        DsMicroservicesModule,
        routing,
    ],
    declarations: [
        DsSystemComponent,
        DsConfigurationsComponent,
        DsTranslationsComponent,
        DsHealthComponent,
        DsThemerComponent,
    ],
    providers: [
        MicroserviceConfig,
        MicroserviceRestangularProvider,
    ]
})
export class DsSystemModule {

}
