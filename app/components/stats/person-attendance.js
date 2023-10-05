import Component from '@glimmer/component';
import Chart from 'chart.js/auto';
import { keepLatestTask } from 'ember-concurrency';
import CONSTANTS from '../../config/constants';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class StatsPersonAttendanceComponent extends Component {
  @service store;
  @service dateFilter;

  @tracked groups;

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  @keepLatestTask
  *loadData() {
    const stats = yield Promise.all(
      this.args.persons.map(async (person) => {
        const presentCount = await this.store.count('attendance', {
          'filter[person][:id:]': person.id,
          'filter[status][:uri:]': CONSTANTS.ATTENDANCE_STATUSES.PRESENT,
          'filter[event][:gte:start-date]':
            this.dateFilter.fromDate?.toISOString(),
          'filter[event][:lte:start-date]':
            this.dateFilter.untilDate?.toISOString(),
        });
        const totalCount = await this.store.count('attendance', {
          'filter[person][:id:]': person.id,
          'filter[event][:gte:start-date]':
            this.dateFilter.fromDate?.toISOString(),
          'filter[event][:lte:start-date]':
            this.dateFilter.untilDate?.toISOString(),
        });
        const percentage = Math.round((presentCount / totalCount) * 100);

        return { person, percentage };
      })
    );

    const groups = {};
    stats.forEach((stat) => {
      const group = groups[`${stat.percentage}`];
      if (group) {
        group.people.push(stat.person);
      } else {
        groups[`${stat.percentage}`] = {
          percentage: stat.percentage,
          people: [stat.person],
        };
      }
    });

    this.groups = Object.keys(groups)
      .map((key) => groups[key])
      .sort((a, b) => a?.percentage - b?.percentage)
      .reverse();
  }
}
