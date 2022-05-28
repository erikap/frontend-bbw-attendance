import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ENV from 'frontend-bbw-attendance/config/environment';

export default class ApplicationController extends Controller {
  @service session;

  @tracked isShownUserMenu = false;

  get pageTitle() {
    return ENV.theme.rootTitle || 'Aanwezigheden';
  }

  get primaryThemeClass() {
    if (ENV.theme.primary) {
      return `theme-${ENV.theme.primary}`;
    } else {
      return null;
    }
  }

  @action
  logout() {
    this.session.invalidate();
  }

  @action
  toggleUserMenu() {
    this.isShownUserMenu = !this.isShownUserMenu;
  }
}
