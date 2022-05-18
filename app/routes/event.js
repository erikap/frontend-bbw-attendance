import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EventRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model(params) {
    const event = await this.store.findRecord('event', params.event_id);
    const attendances = await this.store.query('attendance', {
      'filter[event][:id:]': event.id,
      page: {
        size: 100,
      },
      sort: 'person.family-name,person.given-name',
      include: 'person',
    });
    return { event, attendances };
  }
}
