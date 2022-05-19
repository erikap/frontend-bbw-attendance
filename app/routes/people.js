import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PeopleRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model() {
    return this.store.query('person', {
      sort: 'family-name,given-name',
      page: {
        size: 100,
      },
    });
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.givenName = null;
    controller.familyName = null;
  }
}
