import { Component } from '@angular/core';
import { DsBaseEntityComponent } from '../../components/base-entity.component';

@Component({
  // selector: See component metadata in DsBaseEntityComponent
  template: `<router-outlet></router-outlet>`
})
export class DsServiceComponent extends DsBaseEntityComponent {

}
