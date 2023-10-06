import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Chart from 'chart.js/auto';
import { keepLatestTask } from 'ember-concurrency';
import CONSTANTS from '../../config/constants';
import { tracked } from '@glimmer/tracking';
import { format } from 'date-fns';

export default class StatsEventAttendanceComponent extends Component {
  @service store;

  @tracked presentPercentages = [];

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
    const rootEl = document.getElementById('app-container');
    const primaryColor = window
      .getComputedStyle(rootEl)
      .getPropertyValue('--color-primary-900');
    return {
      labels: this.xAxisLabels,
      datasets: [
        {
          borderColor: primaryColor,
          data: this.presentPercentages,
        },
      ],
    };
  }

  @keepLatestTask
  *loadData() {
    const percentages = yield Promise.all(
      this.sortedEvents.map(async (event) => {
        const presentCount = await this.store.count('attendance', {
          'filter[event][:id:]': event.id,
          'filter[status][:uri:]': CONSTANTS.ATTENDANCE_STATUSES.PRESENT,
        });
        const totalCount = await this.store.count('attendance', {
          'filter[event][:id:]': event.id,
        });
        let percentage = 0;
        if (totalCount) {
          percentage = Math.round((presentCount / totalCount) * 100);
        }

        return { percentage };
      }),
    );

    this.presentPercentages = percentages.map((c) => c.percentage);
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
            title: {
              text: 'Percentage (%)',
              display: true,
            },
            grid: {
              display: true,
            },
            suggestedMax: 100,
            suggestedMin: 0,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }
}
