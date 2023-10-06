import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { keepLatestTask } from 'ember-concurrency';
import CONSTANTS from '../config/constants';

export default class PersonPickerComponent extends Component {
  @service store;

  @tracked persons = [];

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  @keepLatestTask
  *loadData() {
    this.persons = yield this.store.query('person', {
      sort: 'family-name,given-name',
      page: {
        size: 100,
      },
      'filter[groups][:uri:]': CONSTANTS.GROUPS.BBW,
      'filter[attendances][event][:not:start-date]': this.args.event?.startDate.toISOString(),
    });
  }
}
