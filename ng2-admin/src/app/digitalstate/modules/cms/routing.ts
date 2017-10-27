import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../../shared/modules/auth/auth-guard.service';

import { DsCmsComponent } from './cms.component';
import { DsDataListComponent } from './components/data-list.component';
import { DsDataShowComponent } from './components/data-show.component';
import { DsDataCreateComponent } from './components/data-create.component';
import { DsDataEditComponent } from './components/data-edit.component';
import { DsTextListComponent } from './components/text-list.component';
import { DsTextShowComponent } from './components/text-show.component';
import { DsTextCreateComponent } from './components/text-create.component';
import { DsTextEditComponent } from './components/text-edit.component';
import { DsPageListComponent } from './components/page-list.component';
import { DsPageShowComponent } from './components/page-show.component';
import { DsPageCreateComponent } from './components/page-create.component';
import { DsPageEditComponent } from './components/page-edit.component';
import { DsFileListComponent } from './components/file-list.component';
import { DsFileShowComponent } from './components/file-show.component';
import { DsFileCreateComponent } from './components/file-create.component';
import { DsFileEditComponent } from './components/file-edit.component';

import { DsSubmissionListComponent } from './components/submission-list.component';
import { DsSubmissionShowComponent } from './components/submission-show.component';

const routes: Routes = [

    // Default route is `DsDataListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsCmsComponent,
        canActivate: [AuthGuardService],
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            { path: '', redirectTo: '/pages/cms/data/list', pathMatch: 'full' },
            { path: 'datas/list', component: DsDataListComponent },
            { path: 'datas/create', component: DsDataCreateComponent },
            { path: 'datas/create/:formLang', component: DsDataCreateComponent },
            { path: 'datas/:id/show', component: DsDataShowComponent },
            { path: 'datas/:id/edit', component: DsDataEditComponent },
            { path: 'datas/:id/edit/:formLang', component: DsDataEditComponent },

            { path: 'texts/list', component: DsTextListComponent },
            { path: 'texts/create', component: DsTextCreateComponent },
            { path: 'texts/create/:formLang', component: DsTextCreateComponent },
            { path: 'texts/:id/show', component: DsTextShowComponent },
            { path: 'texts/:id/edit', component: DsTextEditComponent },
            { path: 'texts/:id/edit/:formLang', component: DsTextEditComponent },

            { path: 'pages/list', component: DsPageListComponent },
            { path: 'pages/create', component: DsPageCreateComponent },
            { path: 'pages/create/:formLang', component: DsPageCreateComponent },
            { path: 'pages/:id/show', component: DsPageShowComponent },
            { path: 'pages/:id/edit', component: DsPageEditComponent },
            { path: 'pages/:id/edit/:formLang', component: DsPageEditComponent },

            { path: 'files/list', component: DsFileListComponent },
            { path: 'files/create', component: DsFileCreateComponent },
            { path: 'files/create/:formLang', component: DsFileCreateComponent },
            { path: 'files/:id/show', component: DsFileShowComponent },
            { path: 'files/:id/edit', component: DsFileEditComponent },
            { path: 'files/:id/edit/:formLang', component: DsFileEditComponent },

        ]
    }
];

export const routing = RouterModule.forChild(routes);
