import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { CmsApiService } from './cms.service';

import { AppState } from '../../app.service';

import { Observable } from 'rxjs/Observable';

import lodashGet from 'lodash/get';


const THEME_KEY_SUFFIX = '-theme';

@Injectable()
export class ThemerService {

    protected defaultThemeKey: string;


    constructor(protected appState: AppState,
                protected translate: TranslateService,
                protected cms: CmsApiService) {

        this.defaultThemeKey = this.getSpaThemeKey();
    }

    getSpaThemeKey(spaId: string = this.appState.get('config').spaId): string {
        return spaId + THEME_KEY_SUFFIX;
    }

    /**
     *
     * @param propPath
     * @param themeKey
     */
    get(propPath: string, defaultValue?: string, themeKey: string = this.defaultThemeKey): string|null {
        try {
            //@Fixme @workaround: The hardcoded `en` property below in entity `data` object is used due to the translation requirement of the backend API.
            const theme = this.appState.get('appCmsContent', {})['datas'][themeKey]['en'];
            return lodashGet(theme, propPath, defaultValue);
        }
        catch (e) {
            return null;
        }
    }

    loadTheme(themeKey: string = this.defaultThemeKey): Observable<any> {
        return this.cms.getEntityBySlug(themeKey, 'data');
    }

    getAppliedTheme(themeKey: string = this.defaultThemeKey): any {
        try {
            return this.appState.get('appCmsContent', {})['datas'][themeKey];
        }
        catch (e) {
            return null;
        }
    }

    saveTheme(themeKey: string, themeData: any): Observable<any> {
        // @Fixme @workaround: Wrap theme data in all language keys due the API translation requirement !! :s
        themeData = this.translate.getLangs().reduce((accum: any, current: any, index) => {
            accum[current] = themeData;
            return accum;
        }, {});
        return this.cms.saveData(themeKey, themeData);
    }
}