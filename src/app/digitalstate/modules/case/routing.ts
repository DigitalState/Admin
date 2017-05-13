import { Routes, RouterModule } from '@angular/router';

import { DsCaseComponent } from './case.component';
import { DsCaseListComponent } from './components/list.component';
import { DsCaseShowComponent } from './components/show.component';
import { DsCaseCreateComponent } from './components/create.component';
import { DsCaseEditComponent } from './components/edit.component';

const routes: Routes = [

    // Default route is `DsCaseListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsCaseComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/cases/list', pathMatch: 'full' },
            { path: 'list', component: DsCaseListComponent  },
            { path: 'create', component: DsCaseCreateComponent },
            { path: ':id/show', component: DsCaseShowComponent },
            { path: ':id/edit', component: DsCaseEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
