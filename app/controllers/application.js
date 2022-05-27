import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @service session;

  @tracked isShownUserMenu = false;

  @action
  logout() {
    this.session.invalidate();
  }

  @action
  toggleUserMenu() {
    this.isShownUserMenu = !this.isShownUserMenu;
  }
}
