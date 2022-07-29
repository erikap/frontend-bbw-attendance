import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PeoplePersonRoute extends Route {
  @service store;

  async model(params) {
    const person = await this.store.findRecord('person', params.person_id);
    const attendances = await this.store.query('attendance', {
      'filter[person][:id:]': person.id,
      page: {
        size: 100,
      },
      sort: '-event.start-date',
      include: 'event',
    });
    return { person, attendances };
  }
}
