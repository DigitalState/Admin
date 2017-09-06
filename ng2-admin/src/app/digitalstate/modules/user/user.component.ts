import { Component, Injector } from '@angular/core';
import { DsBaseEntityComponent } from '../../components/base-entity.component';

@Component({
  selector: 'ds-user',
  template: `<router-outlet></router-outlet>`
})
export class DsUserComponent extends DsBaseEntityComponent {

}
