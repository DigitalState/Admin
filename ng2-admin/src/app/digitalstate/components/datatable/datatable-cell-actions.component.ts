
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
    selector: 'ds-datatable-cell-actions',
    template: `
		<ul class="btn-list clearfix">
			<li *ngFor="let action of row._.actions" [hidden]="!action.visible">
				<button class="{{ action.class }}" (click)="emitRowAction(action)">
					<i class="{{ action.iconClass }}">{{ action.title | translate}}</i>
				</button>
			</li>
			<!--<li [hidden]="!row._.actions.show">-->
				<!--<button [routerLink]="['../', row.uuid, 'show']" type="button" class="btn btn-default btn-with-icon">-->
                    <!--<i class="ion-eye"><span class="text">{{'ds.microservices.entity.action.show' | translate}}</span></i>-->
                <!--</button>-->
			<!--</li>-->
			<!--<li [hidden]="!row._.actions.edit">-->
				<!--<button [routerLink]="['../', row.uuid, 'edit']" type="button" class="btn btn-default btn-with-icon">-->
                    <!--<i class="ion-edit"><span class="text">{{'ds.microservices.entity.action.edit' | translate}}</span></i>-->
                <!--</button>-->
			<!--</li>-->
		</ul>
    `
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
