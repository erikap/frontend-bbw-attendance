import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;

  activate() {
    this.router.on('routeWillChange', () => {
      this.controller.isShownUserMenu = false;
    });
  }
}
