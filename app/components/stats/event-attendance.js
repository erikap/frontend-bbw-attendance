import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Chart from 'chart.js/auto';
import { keepLatestTask } from 'ember-concurrency';
import CONSTANTS from '../../config/constants';
import sub from 'date-fns/sub';
import { tracked } from '@glimmer/tracking';
import { format } from 'date-fns';

export default class StatsEventAttendanceComponent extends Component {
  @service store;

  @tracked presentCounts = [];
  @tracked totalCounts = [];

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  get sortedEvents() {
    return this.args.events.slice(0).reverse();
  }

  get xAxisLabels() {
    return this.sortedEvents
      .map((e) => e.startDate)
      .map((d) => format(d, 'dd/MM/yyyy HH:mm'));
  }

  get data() {
    return {
      labels: this.xAxisLabels,
      datasets: [
        {
          borderColor: 'rgb(76, 29, 149, 1)',
          data: this.presentCounts,
        },
      ],
    };
  }

  @keepLatestTask
  *loadData() {
    const startDate = sub(new Date(), { months: 6 });
    const counts = yield Promise.all(
      this.sortedEvents.map(async (event) => {
        const presentCount = await this.store.count('attendance', {
          'filter[event][:id:]': event.id,
          'filter[status][:uri:]': CONSTANTS.ATTENDANCE_STATUSES.PRESENT,
          'filter[event][:gt:start-date]': startDate.toISOString(),
        });
        const totalCount = await this.store.count('attendance', {
          'filter[event][:id:]': event.id,
          'filter[event][:gt:start-date]': startDate.toISOString(),
        });

        return { presentCount, totalCount };
      })
    );

    this.presentCounts = counts.map((c) => c.presentCount);
    this.totalCounts = counts.map((c) => c.totalCount);
  }

  @action
  draw(element) {
    new Chart(element, {
      type: 'line',
      data: this.data,
      options: {
        plugins: {
          legend: false,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            max: Math.max(...this.totalCounts),
            min: Math.min(...this.presentCounts),
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }
}
