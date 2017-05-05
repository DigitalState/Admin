import { Routes, RouterModule } from '@angular/router';

import { DsServiceComponent } from './service.component';
import { DsServiceListComponent } from './components/list.component';
import { DsServiceShowComponent } from './components/show.component';
import { DsServiceCreateComponent } from './components/create.component';
import { DsServiceEditComponent } from './components/edit.component';
import { DsServiceActivateComponent } from './components/activate.component';


const routes: Routes = [

    // Default route is `DsServiceListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsServiceComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/services/list', pathMatch: 'full' },
            { path: 'list', component: DsServiceListComponent  },
            { path: 'create', component: DsServiceCreateComponent },
            { path: ':id/show', component: DsServiceShowComponent },
            { path: ':id/edit', component: DsServiceEditComponent },
            { path: ':id/activate', component: DsServiceActivateComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
