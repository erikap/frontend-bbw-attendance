import Component from '@glimmer/component';
import Chart from 'chart.js/auto';
import { keepLatestTask } from 'ember-concurrency';
import sub from 'date-fns/sub';
import CONSTANTS from '../../config/constants';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class StatsPersonAttendanceComponent extends Component {
  @service store;

  @tracked stats;

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  get sortedStats() {
    return this.stats.sortBy('percentage', 'person.familyName').reverse();
  }

  get data() {
    return {
      labels: this.sortedStats.map((s) => s.person.fullName),
      datasets: [
        {
          borderColor: 'rgb(76, 29, 149, 1)',
          data: this.sortedStats.map((s) => s.percentage),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          axis: 'y',
          grouped: false,
          barThickness: 15,
        },
      ],
    };
  }

  @keepLatestTask
  *loadData() {
    const startDate = sub(new Date(), { months: 6 });
    this.stats = yield Promise.all(
      this.args.persons.map(async (person) => {
        const presentCount = await this.store.count('attendance', {
          'filter[person][:id:]': person.id,
          'filter[status][:uri:]': CONSTANTS.ATTENDANCE_STATUSES.PRESENT,
          'filter[event][:gt:start-date]': startDate.toISOString(),
        });
        const totalCount = await this.store.count('attendance', {
          'filter[person][:id:]': person.id,
          'filter[event][:gt:start-date]': startDate.toISOString(),
        });
        const percentage = Math.round((presentCount / totalCount) * 100);

        return { person, percentage };
      })
    );
  }

  @action
  draw(element) {
    new Chart(element, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: false,
        indexAxis: 'y',
        plugins: {
          legend: false,
        },
        scales: {
          x: {
            type: 'linear',
            grid: {
              display: false,
            },
          },
          y: {
            type: 'category',
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: false,
              padding: 10,
              stepSize: 1,
            },
          },
        },
      },
    });
  }
}
