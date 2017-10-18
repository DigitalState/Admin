import { Component, Injector } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';
import download from '../../../../shared/utils/download';

import { DsBaseEntityShowComponent } from '../../../components/base-entity-show.component';
import { EntityApiService } from '../entity-api.service';
import { Link } from '../../../models/link';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'ds-file-show',
    templateUrl: '../templates/file-show.template.html'
})
export class DsFileShowComponent extends DsBaseEntityShowComponent {

    entityUrlPrefix = 'files';
    pageTitle = 'general.menu.cms';
    headerTitle = 'ds.microservices.entity.types.file';
    backLink = new Link(['../../list'], 'general.list');

    protected fileReader: FileReader;

    constructor(protected injector: Injector,
                protected microserviceConfig: MicroserviceConfig,
                protected entityApiService: EntityApiService) {

        super(injector, microserviceConfig);

        this.entityApiService = entityApiService;
        this.fileReader = new FileReader();
    }

    protected prepareEntity(): Observable<{ entity: any, entityParent?: any }> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;

            this.prepareFile();

            return Observable.of({'entity': entity});
        });
    }

    protected prepareFile() {
        const fileTestRegex = /^image\/(jp.?g|gif|png)$/;

        // Add file metadata to the entity
        if (!this.entity.file) {
            this.entity.file = {};
        }

        // Extract the type from the Base64 representation of the file and use it
        // to create the file metadata
        const fileStr = this.entity.presentation[this.lang];
        if (!fileStr) {
            return;
        }

        const fileType = fileStr.substring('data:'.length, fileStr.indexOf(';base64'));

        this.entity.file[this.lang] = {
            type: fileType,
            extension: fileType.substring(fileType.indexOf('/') + 1),
            canPreview: fileTestRegex.test(fileType)
        };

        console.log(this.entity.file[this.lang]);
    }

    protected downloadFile() {
        download(this.entity.presentation[this.lang],
            'download.' + this.entity.file[this.lang].extension,
            this.entity.file[this.lang].fileType);
    }
}
