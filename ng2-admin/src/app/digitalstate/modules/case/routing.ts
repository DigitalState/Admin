import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../../shared/modules/auth/auth-guard.service';
import { DsCaseComponent } from './case.component';
import { DsCaseListComponent } from './components/case-list.component';
import { DsCaseShowComponent } from './components/case-show.component';
import { DsCaseCreateComponent } from './components/case-create.component';
import { DsCaseEditComponent } from './components/case-edit.component';
import { DsCaseStatusListComponent } from './components/status-list.component';
import { DsCaseStatusShowComponent } from './components/status-show.component';
import { DsCaseStatusCreateComponent } from './components/status-create.component';
import { DsCaseStatusEditComponent } from './components/status-edit.component';

const routes: Routes = [

    // Default route is `DsCaseListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsCaseComponent,
        canActivate: [AuthGuardService],
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/cases/list', pathMatch: 'full' },
            { path: 'list', component: DsCaseListComponent },
            { path: 'create', component: DsCaseCreateComponent },
            { path: 'create/:formLang', component: DsCaseCreateComponent },
            { path: ':id/show', component: DsCaseShowComponent },
            { path: ':id/edit', component: DsCaseEditComponent },
            { path: ':id/edit/:formLang', component: DsCaseEditComponent },

            // { path: ':caseUuid/case-status/list', component: DsCaseStatusListComponent },
            { path: ':caseUuid/case-statuses/create', component: DsCaseStatusCreateComponent },
            { path: ':caseUuid/case-statuses/create/:formLang', component: DsCaseStatusCreateComponent },
            { path: ':caseUuid/case-statuses/:id/show', component: DsCaseStatusShowComponent },
            { path: ':caseUuid/case-statuses/:id/edit', component: DsCaseStatusEditComponent },
            { path: ':caseUuid/case-statuses/:id/edit/:formLang', component: DsCaseStatusEditComponent },

        ]
    }
];

export const routing = RouterModule.forChild(routes);
