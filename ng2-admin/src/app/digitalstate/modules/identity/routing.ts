import { Routes, RouterModule } from '@angular/router';

import { DsIdentityComponent } from './identity.component';
import { DsBusinessUnitListComponent, DsOrganizationListComponent, DsIndividualListComponent, DsStaffListComponent, DsAnonymousListComponent } from './components/identity-list.component';
import { DsBusinessUnitShowComponent, DsOrganizationShowComponent, DsIndividualShowComponent, DsStaffShowComponent, DsAnonymousShowComponent } from './components/identity-show.component';
import { DsBusinessUnitCreateComponent, DsOrganizationCreateComponent, DsIndividualCreateComponent, DsStaffCreateComponent, DsAnonymousCreateComponent } from './components/identity-create.component';
import { DsBusinessUnitEditComponent, DsOrganizationEditComponent, DsIndividualEditComponent, DsStaffEditComponent, DsAnonymousEditComponent } from './components/identity-edit.component';
// import { DsIndividualListComponent } from './components/individual-list.component';
import { DsPersonaCreateComponent } from './components/persona-create.component';
import { DsPersonaShowComponent } from './components/persona-show.component';
import { DsPersonaEditComponent } from './components/persona-edit.component';

const routes: Routes = [

    // Default route is `DsIdentityListComponent`. See pages.routing.ts
    {
        path: '',
        component: DsIdentityComponent,
        children: [
            // Uncomment the following to have the default EMPTY route redirect back to the dashboard
            // { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
            { path: '', redirectTo: 'individuals/list', pathMatch: 'full' },
            // { path: 'list', component: DsIdentityListComponent  },
            // { path: 'create', component: DsIdentityCreateComponent },
            // { path: ':id/show', component: DsIdentityShowComponent },
            // { path: ':id/edit', component: DsIdentityEditComponent },
            { path: 'business-units/list', component: DsBusinessUnitListComponent },
            { path: 'business-units/create', component: DsBusinessUnitCreateComponent },
            { path: 'business-units/:id/show', component: DsBusinessUnitShowComponent },
            { path: 'business-units/:id/edit', component: DsBusinessUnitEditComponent },
            { path: 'organizations/list', component: DsOrganizationListComponent },
            { path: 'organizations/create', component: DsOrganizationCreateComponent },
            { path: 'organizations/:id/show', component: DsOrganizationShowComponent },
            { path: 'organizations/:id/edit', component: DsOrganizationEditComponent },
            { path: 'individuals/list', component: DsIndividualListComponent },
            { path: 'individuals/create', component: DsIndividualCreateComponent },
            { path: 'individuals/:id/show', component: DsIndividualShowComponent },
            { path: 'individuals/:id/edit', component: DsIndividualEditComponent },
            { path: 'staffs/list', component: DsStaffListComponent },
            { path: 'staffs/create', component: DsStaffCreateComponent },
            { path: 'staffs/:id/show', component: DsStaffShowComponent },
            { path: 'staffs/:id/edit', component: DsStaffEditComponent },
            { path: 'anonymouses/list', component: DsAnonymousListComponent },
            { path: 'anonymouses/create', component: DsAnonymousCreateComponent },
            { path: 'anonymouses/:id/show', component: DsAnonymousShowComponent },
            { path: 'anonymouses/:id/edit', component: DsAnonymousEditComponent },
            { path: ':identityPlural/:identityUuid/personas/create', component: DsPersonaCreateComponent },
            { path: ':identityPlural/:identityUuid/personas/:id/show', component: DsPersonaShowComponent },
            { path: ':identityPlural/:identityUuid/personas/:id/edit', component: DsPersonaEditComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
