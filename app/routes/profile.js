import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileRoute extends Route {
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.errorMessage = null;
    controller.oldPassword = null;
    controller.newPassword = null;
    controller.newPasswordConfirmation = null;
    controller.changePassword.cancelAll({ resetState: true });
  }
}
