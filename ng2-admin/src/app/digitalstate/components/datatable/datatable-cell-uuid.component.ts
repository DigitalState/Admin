import { Component, EventEmitter, Input, Output } from '@angular/core';
import moment from 'moment';

import { AppState } from '../../../app.service';
import { DsEntityTranslationService } from '../../../shared/services/entity-translation.service';
import { DsDatatableCell } from './datatable-cell.component';

@Component({
    selector: 'ds-datatable-cell-uuid',
    template: `
        <span title="{{ outputTitle }}" class="cursor-pointer">{{ outputValue }}</span>
    `
})
export class DsDatatableCellUuid extends DsDatatableCell {

    /**
     * The tooltip title of the UUID
     */
    outputTitle: string;

    constructor(protected entityTranslation: DsEntityTranslationService,
                protected appState: AppState) {
        super(entityTranslation, appState);
    }

    ngOnInit() {
        if (this.value) {
            this.outputTitle = this.value;
            this.outputValue = this.value.substring(0, this.value.indexOf('-'));
        }
    }

}
