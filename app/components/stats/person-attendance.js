import Component from '@glimmer/component';
import { keepLatestTask } from 'ember-concurrency';
import CONSTANTS from '../../config/constants';
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
        const tooLateCount = await this.store.count('attendance', {
          'filter[person][:id:]': person.id,
          'filter[category][:uri:]': CONSTANTS.ATTENDANCE_CATEGORIES.TOO_LATE,
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
        const presentPercentage =
              totalCount != 0 ? Math.round((presentCount / totalCount) * 100) : 0;
        const tooLatePercentage =
              totalCount != 0 ? Math.round((tooLateCount / presentCount) * 100) : 0;

        return { person, presentPercentage, tooLatePercentage };
      }),
    );

    const groups = {};
    stats.forEach((stat) => {
      const group = groups[`${stat.presentPercentage}`];
      const item = {
        record: stat.person,
        present: stat.presentPercentage,
        tooLate: stat.tooLatePercentage
      };
      if (group) {
        group.people.push(item);
      } else {
        groups[`${stat.presentPercentage}`] = {
          percentage: stat.presentPercentage,
          people: [item],
        };
      }
    });

    this.groups = Object.keys(groups)
      .map((key) => groups[key])
      .sort((a, b) => a?.percentage - b?.percentage)
      .reverse();
  }
}
