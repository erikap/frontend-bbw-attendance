import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  @service session;

  async beforeModel() {
    await this.session.setup();
  }

  activate() {
    this.router.on('routeWillChange', () => {
      this.controller.isShownUserMenu = false;
    });
  }
}
