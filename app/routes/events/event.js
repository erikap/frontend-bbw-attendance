import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EventsEventRoute extends Route {
  @service store;

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

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.isEditing = false;
    controller.resetDateAndTime(model.event.startDate);
  }
}
