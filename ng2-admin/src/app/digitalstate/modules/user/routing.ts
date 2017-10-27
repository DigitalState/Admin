import { Routes, RouterModule } from '@angular/router';

import { DsUserComponent } from './user.component';
import { DsUserListComponent } from './components/user-list.component';
import { DsUserShowComponent } from './components/user-show.component';
import { DsUserCreateComponent } from './components/user-create.component';
import { DsUserEditComponent } from './components/user-edit.component';

const routes: Routes = [

    // Default routerLink is `DsUserListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsUserComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/users/list', pathMatch: 'full' },
            { path: 'list', component: DsUserListComponent  },
            { path: 'create', component: DsUserCreateComponent },
            { path: 'create/:formLang', component: DsUserCreateComponent },
            { path: ':id/show', component: DsUserShowComponent },
            { path: ':id/edit', component: DsUserEditComponent },
            { path: ':id/edit/:formLang', component: DsUserEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
