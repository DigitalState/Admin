import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import {TranslateModule, TranslateLoader, LangChangeEvent} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import {Subject} from 'rxjs';

// export function createTranslateLoader(http: Http) {
//     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
//
// const translationOptions = {
//   loader: {
//     provide: TranslateLoader,
//     useFactory: createTranslateLoader,
//     deps: [Http]
//   }
// };

@NgModule({
  // imports: [TranslateModule.forRoot(translationOptions)],
  imports: [TranslateModule],
  exports: [TranslateModule],
  providers: [TranslateService]
})
export class AppTranslationModule {

  protected supportedLanguages = ['en', 'fr'];

  constructor(translate: TranslateService) {
    const defaultLang = localStorage.getItem('lang') || this.supportedLanguages[0];
    translate.addLangs(this.supportedLanguages);
    translate.setDefaultLang(defaultLang);
    translate.use(defaultLang);

    // Preload other translations so the app can support multiple translations in a single page
    this.supportedLanguages.forEach(lang => {
      if (lang !== defaultLang) {
        translate.getTranslation(lang);
      }
    });
  }
}
