import { Component, Injector } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';

import { GlobalState } from '../../../../global.state';
import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import { EntityApiService, IdentityApiService } from '../entity-api.service';
import { CmsApiService } from '../../../../shared/services/cms.service';
import { DsPageComponent } from '../../../../shared/components/page-component';

import { Subscriber } from 'rxjs/Subscriber';
import assign from 'lodash/assign';
import mapValues from 'lodash/mapValues';
import reduce from 'lodash/reduce';
import isObject from 'lodash/isObject';
import forEach from 'lodash/forEach';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'ds-system',
    templateUrl: '../templates/themer.template.html',
    styleUrls: ['../styles/themer.scss'],
})
export class DsThemerComponent extends DsPageComponent {

    pageTitle = 'general.menu.themeEditor';

    protected form: FormGroup;
    protected sidebarBgColor: AbstractControl;
    protected sidebarTextColor: AbstractControl;

    protected data: any = {

    };


    constructor(protected injector: Injector,
                protected fb: FormBuilder) {
        super(injector);

        this.form = fb.group({
            // 'sidebarBgColor': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            // 'sidebarBgColor': { value: '', 'validator': Validators.compose([Validators.required, Validators.minLength(1)])},
            'sidebarBgColor': { value: '', 'validator': null },
            'sidebarTextColor': { value: '', 'validator': null },
        });

        this.sidebarBgColor = this.form.controls['sidebarBgColor'];
        this.sidebarTextColor = this.form.controls['sidebarTextColor'];
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onSubmit(formValue: any) {

    }
}
