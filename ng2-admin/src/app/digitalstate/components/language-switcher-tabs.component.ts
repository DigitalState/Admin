import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DsLanguageSwitcherComponent } from './language-switcher.component';

@Component({
    selector: 'ds-language-switcher-tabs',
    template: `
        <ul #tabsList class="switcher-tabs language-tabs">
            <li *ngFor="let language of languages" 
                [ngClass]="{'active': currentLanguage === language}" 
                class="switcher-tab-item lang-{{language}}">
                <span class="link-container">
                    <span class="lang-checkbox d-none">
                        <md-checkbox></md-checkbox>
                    </span>
                    <span class="icon"></span>
                    <a href="javascript:;" (click)="onLanguageTabClick(language)">
                        <!--<i class="fa fa-flag"></i>-->
                        {{ 'languages.' + language | translate }}
                    </a>
                </span>
            </li>
        </ul>
    `,
    host: {
        class: 'ds-language-switcher-tabs'
    }
})
export class DsLanguageSwitcherTabsComponent {

    @ViewChild('tabsList') tabsListElement: ElementRef;

    @Input() languages: Array<string>;
    @Input() currentLanguage: string;

    /**
     * Prevent visual updates of selected tab when set to FALSE which gives
     * the tabs the appearance of static links and gives the control of activating
     * a tab to the parent component.
     */
    @Input() canUpdateTabsOnSwitch: boolean = true;

    @Output() onLanguageChange: EventEmitter<string>;

    // currentLanguage: object;
    // languages: object[];
    checked: true;

    constructor(protected translate: TranslateService) {
        this.onLanguageChange = new EventEmitter();
    }

    ngOnInit() {
        // if (!this.languages) {
        //     this.languages = this.translate.getLangs();
        // }
        //
        // if (!this.currentLanguage) {
        //     this.currentLanguage = this.translate.currentLang;
        // }

        // this.languages = this.translate.getLangs().map((langKey) =>
        //     ({
        //         key: langKey,
        //         name: this.translate.instant('languages.' + langKey)
        //     })
        // );

        // this.loadCurrentLanguageTranslation();
    }

    onLanguageTabClick(lang: string) {
        if (lang === this.currentLanguage) {
            return;
        }

        this.onLanguageChange.emit(lang);
        // this.translate.use(lang).subscribe((translationDocument) => {
        //     localStorage.setItem('lang', lang);
        //     this.loadCurrentLanguageTranslation();
        //     return Observable.of({ lang: lang, translations: translationDocument });
        // });

        if (this.canUpdateTabsOnSwitch) {
            let $tabs = $(this.tabsListElement.nativeElement);
            $tabs.find('.switcher-tab-item').removeClass('active');
            $tabs.find('.switcher-tab-item.lang-' + lang).addClass('active');
        }
    }

    // getListedLanguages() {
    //     // return this.languages.filter((language) => (language['key'] !== this.translate.currentLang));
    //     return this.languages;
    // }

    // protected loadCurrentLanguageTranslation() {
    //     this.currentLanguage = {
    //         key: this.translate.currentLang,
    //         name: this.translate.instant('languages.' + this.translate.currentLang)
    //     };
    // }
}
