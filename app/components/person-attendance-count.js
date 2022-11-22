import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { keepLatestTask } from 'ember-concurrency';
import CONSTANTS from '../config/constants';

export default class PersonAttendanceCountComponent extends Component {
  @service store;
  @service dateFilter;

  @tracked presentCount;
  @tracked totalCount;

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  @keepLatestTask
  *loadData() {
    this.presentCount = yield this.store.count('attendance', {
      'filter[person][:id:]': this.args.person.id,
      'filter[status][:uri:]': CONSTANTS.ATTENDANCE_STATUSES.PRESENT,
      'filter[event][:gte:start-date]':
        this.dateFilter.fromDate?.toISOString(),
      'filter[event][:lte:start-date]': this.dateFilter.untilDate?.toISOString(),
    });
    this.totalCount = yield this.store.count('attendance', {
      'filter[person][:id:]': this.args.person.id,
      'filter[event][:gte:start-date]':
        this.dateFilter.fromDate?.toISOString(),
      'filter[event][:lte:start-date]': this.dateFilter.untilDate?.toISOString(),
    });
  }
}
