import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Restangular } from 'ngx-restangular';
import { ToastsManager } from 'ng2-toastr';
import { DefaultModal } from '../../../components/modals/default-modal/default-modal.component';
import 'rxjs/Rx';

@Component({
    selector: 'ds-service-show',
    templateUrl: '../templates/show.template.html'
})
export class DsServiceShowComponent {

    public entity;

    private id: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private restangular: Restangular,
                private toastr: ToastsManager,
                private modal: NgbModal) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.id = params['id'];
            console.log(this.id);
        });

        this.restangular.one('services', this.id).withHttpConfig({ cache: false }).get().subscribe(res => {
            this.entity = res;
        });
    }

    deleteEntity() {
        const modal = this.modal.open(DefaultModal, {size: 'lg'});
        modal.componentInstance.modalHeader = 'Confirm';
        modal.componentInstance.modalContent = `Are you sure you want to delete this entity?`;
        modal.componentInstance.actions = [
            { command: 'yes', label: 'Yes' },
            { command: 'no', label: 'No' },
        ];

        modal.result.then((modalResult) => {
            console.log(modalResult);
            if (modalResult.command === 'yes') {
                this.entity.remove()
                .subscribe((response) => {
                    console.log('Entity deleted successfully, server response: ', response);
                    this.toastr.success('Entity deleted successfully');
                    this.router.navigate(['../../list'], { relativeTo: this.route });
                }, (error) => {
                    console.error('Failed to delete entity', error);
                    this.toastr.error('Failed to delete entity');
                });
            }
        }, (modalRejection) => {
            // handle the case where the user naturally exits the modal dialog
        });

    }
}
