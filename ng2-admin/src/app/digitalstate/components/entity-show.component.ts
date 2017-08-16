import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Link } from '../models/link';

import 'rxjs/Rx';

@Component({
    selector: 'ds-entity-show',
    templateUrl: '../templates/entity-show.template.html'
})
export class DsEntityShowComponent {

    @Input() headerTitle: string;
    @Input() headerSubtitle: string;
    @Input() entity: any;
    @Input() backLink: Link;
    @Input() actions: Array<object>;

    @Output() entityActionEmitter = new EventEmitter();
    @Output() onDelete = new EventEmitter<any>();

    constructor() {

    }

    ngOnInit() {
        if (this.headerSubtitle == null) {
            // this.headerSubtitle = this.entity.uuid;
        }
    }

    protected emitEntityAction(action: any) {
        this.entityActionEmitter.emit({ action: action });
    }

    onDeleteClick(event) {
        this.onDelete.emit(event);
    }
}
