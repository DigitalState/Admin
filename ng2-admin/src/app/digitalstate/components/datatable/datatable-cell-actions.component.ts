
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
    selector: 'ds-datatable-cell-actions',
    template: `
		<div class="btn-group btn-group-primary">
			<button type="button" class="btn btn-default dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<i class="fa fa-ellipsis-h align-middle"></i>
				<span class="sr-only">{{ 'ds.microservices.entity.action.actions' | translate }}</span>
			</button>
			<div class="dropdown-menu">
				<button *ngFor="let action of row._.actions" 
                        class="dropdown-item" 
                        [hidden]="!action.visible" 
                        [ngClass]="action.class" 
                        (click)="emitRowAction(action)">
					<i class="{{ action.iconClass }}">{{ action.title | translate}}</i>
				</button>
			</div>
		</div>
    `,
    host: {
        class: 'ds-datatable-cell-actions'
    }
})
export class DsDatatableCellActions {
    @Input() row: any;
    @Output() rowActionEmitter = new EventEmitter();

    ngOnInit() {
        // console.log(this.row._.actions);
    }

    emitRowAction(action: any) {
        this.rowActionEmitter.emit({
            row: this.row,
            action: action
        });
    }
}
