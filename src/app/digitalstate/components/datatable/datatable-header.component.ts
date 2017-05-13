
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
    selector: 'ds-datatable-header',
    template: `
		<strong (click)="sort()">{{column.name}}</strong>
		<div class="form-group">
			<input name="{{column.name}}" type="text" class="form-control" (keyup)="updateFilter($event)" />
		</div>
    `
})
export class DsDatatableHeader {
    @Input() column: TableColumn;
    @Output() onFilterUpdate = new EventEmitter<any>();

    updateFilter(event) {
        this.onFilterUpdate.emit({column: this.column, event: event});
    }

    sort() {

    }
}
