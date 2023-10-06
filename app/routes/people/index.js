import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import CONSTANTS from '../../config/constants';

export default class PeopleIndexRoute extends Route {
  @service store;

  model() {
    return this.store.query('person', {
      sort: 'family-name,given-name',
      page: {
        size: 100,
      },
      'filter[groups][:uri:]': CONSTANTS.GROUPS.BBW,
    });
  }

  async afterModel() {
    this.archivedPeople = await this.store.query('person', {
      sort: 'family-name,given-name',
      page: {
        size: 100,
      },
      'filter[groups][:uri:]': CONSTANTS.GROUPS.EXTERNAL,
    });

    this.bbwGroup = await this.store.findRecordByUri(
      'group',
      CONSTANTS.GROUPS.BBW,
    );
    this.externalGroup = await this.store.findRecordByUri(
      'group',
      CONSTANTS.GROUPS.EXTERNAL,
    );
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.givenName = null;
    controller.familyName = null;
    controller.defaultGroup = this.bbwGroup;
    controller.archiveGroup = this.externalGroup;
    controller.archivedPeople = this.archivedPeople;
  }
}
