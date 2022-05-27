import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { keepLatestTask } from 'ember-concurrency';
import CONSTANTS from '../config/constants';
import sub from 'date-fns/sub';

export default class PersonAttendanceCountComponent extends Component {
  @service store;

  @tracked presentCount;
  @tracked totalCount;

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  @keepLatestTask
  *loadData() {
    const startDate = sub(new Date(), { months: 6 });
    this.presentCount = yield this.store.count('attendance', {
      'filter[person][:id:]': this.args.person.id,
      'filter[status][:uri:]': CONSTANTS.ATTENDANCE_STATUSES.PRESENT,
      'filter[event][:gt:start-date]': startDate.toISOString(),
    });
    this.totalCount = yield this.store.count('attendance', {
      'filter[person][:id:]': this.args.person.id,
      'filter[event][:gt:start-date]': startDate.toISOString(),
    });
  }
}
