import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import CONSTANTS from '../../config/constants';

export default class EventsIndexRoute extends Route {
  @service store;

  async model() {
    const events = await this.store.query('event', {
      sort: '-start-date',
      page: {
        size: 100,
      },
    });

    const persons = await this.store.query('person', {
      sort: 'family-name,given-name',
      page: {
        size: 100,
      },
      'filter[groups][:uri:]': CONSTANTS.GROUPS.BBW,
    });

    return { events, persons };
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.name = 'Repetitie';
    controller.date = new Date().toISOString().substr(0, 'YYYY-MM-DD'.length);
    controller.time = '20:00';
  }
}
