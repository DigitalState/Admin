import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../../shared/modules/auth/auth-guard.service';

import { DsServiceComponent } from './service.component';
import { DsServiceListComponent } from './components/service-list.component';
import { DsServiceShowComponent } from './components/service-show.component';
import { DsServiceCreateComponent } from './components/service-create.component';
import { DsServiceEditComponent } from './components/service-edit.component';

import { DsScenarioListComponent } from './components/scenario-list.component';
import { DsScenarioShowComponent } from './components/scenario-show.component';
import { DsScenarioCreateInfoComponent, DsScenarioCreateBpmComponent, DsScenarioCreateUrlComponent, DsScenarioCreateApiComponent } from './components/scenario-create.component';
import { DsScenarioEditInfoComponent, DsScenarioEditBpmComponent, DsScenarioEditUrlComponent, DsScenarioEditApiComponent } from './components/scenario-edit.component';
import { DsScenarioActivateComponent } from './components/scenario-activate.component';

import { DsSubmissionListComponent } from './components/submission-list.component';
import { DsSubmissionShowComponent } from './components/submission-show.component';

const routes: Routes = [

    // Default routerLink is `DsServiceListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsServiceComponent,
        canActivate: [AuthGuardService],
        children: [
            // Uncomment the following to have the default EMPTY routerLink redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/services/list', pathMatch: 'full' },
            { path: 'list', component: DsServiceListComponent },
            { path: 'create', component: DsServiceCreateComponent },
            { path: 'create/:formLang', component: DsServiceCreateComponent },
            { path: ':id/show', component: DsServiceShowComponent },
            { path: ':id/edit', component: DsServiceEditComponent },
            { path: ':id/edit/:formLang', component: DsServiceEditComponent },

            // { path: ':serviceUuid/scenarios/list', component: DsScenarioListComponent },
            { path: ':serviceUuid/scenarios/create/info', component: DsScenarioCreateInfoComponent },
            { path: ':serviceUuid/scenarios/create/info/:formLang', component: DsScenarioCreateInfoComponent },
            { path: ':serviceUuid/scenarios/create/bpm', component: DsScenarioCreateBpmComponent },
            { path: ':serviceUuid/scenarios/create/bpm/:formLang', component: DsScenarioCreateBpmComponent },
            { path: ':serviceUuid/scenarios/create/url', component: DsScenarioCreateUrlComponent },
            { path: ':serviceUuid/scenarios/create/url/:formLang', component: DsScenarioCreateUrlComponent },
            { path: ':serviceUuid/scenarios/create/api', component: DsScenarioCreateApiComponent },
            { path: ':serviceUuid/scenarios/create/api/:formLang', component: DsScenarioCreateApiComponent },

            { path: ':serviceUuid/scenarios/:id/show', component: DsScenarioShowComponent },
            { path: ':serviceUuid/scenarios/:id/edit/info', component: DsScenarioEditInfoComponent },
            { path: ':serviceUuid/scenarios/:id/edit/info/:formLang', component: DsScenarioEditInfoComponent },
            { path: ':serviceUuid/scenarios/:id/edit/bpm', component: DsScenarioEditBpmComponent },
            { path: ':serviceUuid/scenarios/:id/edit/bpm/:formLang', component: DsScenarioEditBpmComponent },
            { path: ':serviceUuid/scenarios/:id/edit/url', component: DsScenarioEditUrlComponent },
            { path: ':serviceUuid/scenarios/:id/edit/url/:formLang', component: DsScenarioEditUrlComponent },
            { path: ':serviceUuid/scenarios/:id/edit/api', component: DsScenarioEditApiComponent },
            { path: ':serviceUuid/scenarios/:id/edit/api/:formLang', component: DsScenarioEditApiComponent },

            { path: ':serviceUuid/scenarios/:id/activate', component: DsScenarioActivateComponent },

            // Shortcuts to scenarios components
            { path: 'scenarios/:id/show', component: DsScenarioShowComponent },
            { path: 'scenarios/:id/edit/info', component: DsScenarioEditInfoComponent },
            { path: 'scenarios/:id/edit/info/:formLang', component: DsScenarioEditInfoComponent },
            { path: 'scenarios/:id/edit/bpm', component: DsScenarioEditBpmComponent },
            { path: 'scenarios/:id/edit/bpm/:formLang', component: DsScenarioEditBpmComponent },
            { path: 'scenarios/:id/edit/url', component: DsScenarioEditUrlComponent },
            { path: 'scenarios/:id/edit/url/:formLang', component: DsScenarioEditUrlComponent },
            { path: 'scenarios/:id/edit/api', component: DsScenarioEditApiComponent },
            { path: 'scenarios/:id/edit/api/:formLang', component: DsScenarioEditApiComponent },
            { path: 'scenarios/:id/activate', component: DsScenarioActivateComponent },

            { path: 'submissions/list', component: DsSubmissionListComponent},
            { path: 'submissions/:id/show', component: DsSubmissionShowComponent},
            // { path: ':scenarioUuid/submissions/:id/show', component: DsSubmissionShowComponent},
        ]
    }
];

export const routing = RouterModule.forChild(routes);
