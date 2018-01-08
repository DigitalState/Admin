import { ElementRef, Injector, ViewChild } from '@angular/core';

import { MicroserviceConfig } from '../../../../shared/providers/microservice.provider';

import { EntityApiService } from '../entity-api.service';
import { DsBaseEntityFormComponent } from '../../../components/base-entity-form.component';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import merge from 'lodash/merge';


export class DsFileFormComponent extends DsBaseEntityFormComponent {

    entityUrlPrefix = 'files';
    pageTitle = 'general.menu.cms';
    headerTitle = 'ds.microservices.entity.types.file';

    @ViewChild('filePreviewImg') filePreviewImg:ElementRef;

    protected fileReader: FileReader;

    constructor(injector: Injector,
                microserviceConfig: MicroserviceConfig,
                entityApiService: EntityApiService) {

        super(injector, microserviceConfig);

        this.entityApiService = entityApiService;
        this.fileReader = new FileReader();
    }

    protected prepareEntity(): Observable<{'entity': any, 'entityParent'?: any}> {
        return super.prepareEntity().flatMap((prepared) => {
            let entity = prepared.entity;

            this.prepareFile();

            this.entity = merge(entity, this.entity);
            return Observable.of({'entity': this.entity});
        });
    }

    /**
     * Strip out the base64 metadata from the image in the `presentation` property.
     * @param entity
     * @return {any}
     */
    // preSave(entity): any {
    //     let sanitizedEntity = super.preSave(entity);
    //     let delimiter = ';base64,';
    //
    //     Object.keys(sanitizedEntity.presentation).forEach((lang) => {
    //         let image = sanitizedEntity.presentation[lang];
    //         console.log('presentation before: ', image);
    //         sanitizedEntity.presentation[lang] = image.substr(image.indexOf(delimiter) + delimiter.length);
    //         console.log('presentation after: ', sanitizedEntity.presentation[lang]);
    //     });
    //
    //     return sanitizedEntity;
    // }

    onFormLanguageChange(newLanguage: { key: string; name: string }): any {
        super.onFormLanguageChange(newLanguage);
        this.prepareFile();
    }

    protected prepareFile() {
        const fileTestRegex = /^image\/(jp.?g|gif|png)$/;

        // Add file metadata to the entity
        if (!this.entity.file) {
            this.entity.file = {};
        }

        // Extract the type from the Base64 representation of the file and use it
        // to create the file metadata
        const fileStr = this.entity.presentation[this.formLang];
        if (!fileStr) {
            return;
        }

        this.entity.file[this.formLang] = {
            dataPrefix: 'data:' + this.entity.type + ';base64,',
            canPreview: fileTestRegex.test(this.entity.type)
        };
    }

    /**
     * File Change handler of the File Input tag in DsFileUploadComponent
     * @param event
     */
    onFileChange(event) {
        // let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            const fileTestRegex = /^image\/(jp.?g|gif|png)$/;
            let delimiter = ';base64,';

            this.fileReader.readAsDataURL(file);
            this.fileReader.onload = (loadEvent: any) => {
                const image = loadEvent.target.result;

                // Set presentation value to the base64 blob and also set file metadata
                this.entity.presentation[this.formLang] = image.substr(image.indexOf(delimiter) + delimiter.length);
                // this.entity.presentation[this.formLang] = loadEvent.target.result;

                this.entity.file[this.formLang] = {
                    dataPrefix: image.substr(0, image.indexOf(delimiter) + delimiter.length),
                    name: file.name,
                    type: file.type,
                    canPreview: fileTestRegex.test(file.type)
                };

                this.entity.type = file.type;

                // Update the preview only if the file is an image
                setTimeout(() => {
                    this.filePreviewImg.nativeElement.src = this.entity.file[this.formLang].canPreview
                        ? loadEvent.target.result
                        : '/assets/img/placeholder.svg';
                });
            };
        }
    }
}
