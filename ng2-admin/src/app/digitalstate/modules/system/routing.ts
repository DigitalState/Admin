import { Routes, RouterModule } from '@angular/router';

import { DsSystemComponent } from './components/system.component';
import { DsConfigurationsComponent } from './components/configurations.component';
import { DsTranslationsComponent } from './components/translations.component';
import { DsHealthComponent } from './components/health.component';

const routes: Routes = [

    // Default route is `DsSystemListComponent`. See pages.routing.ts
    {
        path: '',
        // component: DsSystemComponent,
        children: [
            // Uncomment the following to have the default EMPTY routerLink redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: '/pages/settings/systems', pathMatch: 'full' },
            { path: 'systems', component: DsSystemComponent },
            { path: 'configurations', component: DsConfigurationsComponent },
            { path: 'configurations/:microservice', component: DsConfigurationsComponent },
            { path: 'translations', component: DsTranslationsComponent },
            { path: 'health', component: DsHealthComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
