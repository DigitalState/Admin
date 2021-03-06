import { Component, EventEmitter, Input, Output } from '@angular/core';
import moment from 'moment';

import { AppState } from '../../../app.service';

import { DsEntityTranslationService } from '../../../shared/services/entity-translation.service';
import { ApiUtils } from '../../../shared/utils/api.utils';

@Component({
    selector: 'ds-datatable-cell',
    template: `
        <span>{{outputValue}}</span>
    `
})
export class DsDatatableCell {
    @Input() value: any;
    @Input() row: any;
    @Input() column: any;

    outputValue: any;


    constructor(protected entityTranslation: DsEntityTranslationService,
                protected appState: AppState) {

    }

    ngOnInit() {
        let config: any = this.appState.get('config');
        let property = this.column.propertyMetadata;
        let hasTranslation = this.entityTranslation.propertyHasTranslation(this.value, property);

        // Render the cell value according to the property type
        if (property) {
            let fieldType = property.hasOwnProperty('field')
                ? property.field.type
                : property.type;

            switch(fieldType) {
                // For a property of type `select`, render the property's label instead of its value
                case 'select':
                    this.outputValue = property.field.options[this.value];
                    break;
                // For a property of type `date`, convert the value from UTC to local time
                case 'date':
                    // Avoid date formatting of invalid values
                    if (this.value) {
                        this.outputValue = moment(this.value).local().format(config.date.format.medium);
                    }
                    break;
                // For a property of type `uri`, output the UUID of the linked entity
                case 'uri':
                    this.outputValue = ApiUtils.getUuidFromUri(this.value);
                    break;
                default:
                    this.outputValue = this.value;
            }
        }
        else {
            this.outputValue = this.value;
        }

        if (property && property.hasOwnProperty('translated') && property.translated === true) {
            let translatedValue = this.entityTranslation.getTranslation(this.value, property);
            this.outputValue = translatedValue
        }
    }

}
