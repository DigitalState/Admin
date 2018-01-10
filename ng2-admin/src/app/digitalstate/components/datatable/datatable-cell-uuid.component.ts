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
        super.ngOnInit();

        // Use the outputValue that has been pre-formatted by the parent cell formatter
        if (this.outputValue) {
            this.outputTitle = this.outputValue;
            this.outputValue = this.outputValue.substring(0, this.outputValue.indexOf('-'));
        }
    }

}
