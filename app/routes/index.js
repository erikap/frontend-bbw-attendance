import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model() {
    return this.store.query('event', {
      sort: '-start-date',
      page: {
        size: 100,
      },
    });
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.name = 'Repetitie';
    controller.date = new Date().toISOString().substr(0, 'YYYY-MM-DD'.length);
    controller.time = '20:00';
  }
}
