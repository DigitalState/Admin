import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';

import 'style-loader!./baPageTop.scss';
import {AuthService} from '../../../shared/modules/auth/auth.service';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;

  protected userIdentity: string;

  constructor(private _state: GlobalState,
              private auth: AuthService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.userIdentity = auth.getAuthUser().identity;
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logout() {
    this.auth.logout();
  }
}
