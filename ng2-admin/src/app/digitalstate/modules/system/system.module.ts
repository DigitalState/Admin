import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LaddaModule } from 'angular2-ladda';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgObjectPipesModule } from 'ngx-pipes';
import { OmitPipe } from 'ngx-pipes/src/app/pipes/object/omit';

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
        NgObjectPipesModule,
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
        OmitPipe,
    ]
})
export class DsSystemModule {

}
