import { Routes, RouterModule } from '@angular/router';
import { DsServiceListComponent } from './components/list.component';
import { DsServiceShowComponent } from './components/show.component';
import { DsServiceActivateComponent } from './components/activate.component';

const routes: Routes = [
    {
        path: '',
        component: DsServiceListComponent
    },
    {
        path: ':id/show',
        component: DsServiceShowComponent
    },
    {
        path: ':id/activate',
        component: DsServiceActivateComponent
    },
];

export const routing = RouterModule.forChild(routes);
