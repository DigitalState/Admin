import { Routes, RouterModule } from '@angular/router';

import { DsSystemComponent } from './components/system.component';

const routes: Routes = [

    // Default route is `DsSystemListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsSystemComponent,
        children: [
            // Uncomment the following to have the default EMPTY routerLink redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },

            // { path: '', redirectTo: '/pages/system/list', pathMatch: 'full' },
            // { path: 'list', component: DsSystemListComponent  },
            // { path: 'create', component: DsSystemCreateComponent },
            // { path: ':id/show', component: DsSystemShowComponent },
            // { path: ':id/edit', component: DsSystemEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
