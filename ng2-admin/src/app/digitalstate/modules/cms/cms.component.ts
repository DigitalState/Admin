import { Component, Injector } from '@angular/core';
import { DsBaseEntityComponent } from '../../components/base-entity.component';

@Component({
  selector: 'ds-cms',
  template: `<router-outlet></router-outlet>`
})
export class DsCmsComponent extends DsBaseEntityComponent {

}
