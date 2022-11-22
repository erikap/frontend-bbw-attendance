import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import CONSTANTS from '../config/constants';

export default class StatsRoute extends Route {
  @service store;
  @service session;
  @service dateFilter;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    const eventsPromise = this.store.query('event', {
      sort: '-start-date',
      page: {
        size: 100,
      },
      'filter[:gte:start-date]': this.dateFilter.fromDate?.toISOString(),
      'filter[:lte:start-date]': this.dateFilter.untilDate?.toISOString(),
    });

    const personsPromise = await this.store.query('person', {
      sort: 'family-name,given-name',
      page: {
        size: 100,
      },
      'filter[groups][:uri:]': CONSTANTS.GROUPS.BBW,
    });

    const [events, persons] = await Promise.all([
      eventsPromise,
      personsPromise,
    ]);

    return { events, persons };
  }
}
