import { Routes, RouterModule } from '@angular/router';

import { DsCasesComponent } from './cases.component';
import { DsCasesListComponent } from './components/list.component';
import { DsCasesShowComponent } from './components/show.component';
import { DsCasesCreateComponent } from './components/create.component';
import { DsCasesEditComponent } from './components/edit.component';
import { DsCasesActivateComponent } from './components/activate.component';


const routes: Routes = [

    // Default route is `DsCasesListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsCasesComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/cases/list', pathMatch: 'full' },
            { path: 'list', component: DsCasesListComponent  },
            // { path: 'create', component: DsCasesCreateComponent },
            // { path: ':id/show', component: DsCasesShowComponent },
            // { path: ':id/edit', component: DsCasesEditComponent },
            // { path: ':id/activate', component: DsCasesActivateComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
