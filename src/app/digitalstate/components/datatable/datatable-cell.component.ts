
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
    selector: 'ds-datatable-cell',
    template: `
        <em>{{value}}</em>
    `
})
export class DsDatatableCell {
    @Input() value: any;
    @Input() row: any;
}
