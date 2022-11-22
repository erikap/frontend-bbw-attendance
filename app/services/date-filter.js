import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import sub from 'date-fns/sub';

const localStorageKey = 'app-bbw-attendance_date-range';

export default class DateFilterService extends Service {
  @service router;

  @tracked fromDate;
  @tracked untilDate;

  constructor() {
    super(...arguments);
    this.deserializeFromLocalStorage();
    if (!this.fromDate) {
      const defaultFromDate = sub(new Date(), { months: 3 });
      this.setFromDate(defaultFromDate);
    }
  }

  setFromDate(fromDate) {
    this.fromDate = fromDate;
    this.serializeToLocalStorage();
    this.router.refresh();
  }

  setUntilDate(untilDate) {
    this.untilDate = untilDate;
    this.serializeToLocalStorage();
    this.router.refresh();
  }

  serializeToLocalStorage() {
    const serializedConfig = JSON.stringify({ fromDate: this.fromDate, untilDate: this.untilDate });
    localStorage.setItem(localStorageKey, serializedConfig);
  }

  deserializeFromLocalStorage() {
    const serializedConfig = localStorage.getItem(localStorageKey);
    if (serializedConfig) {
      const config = JSON.parse(serializedConfig);
      if (config.fromDate) {
        this.fromDate = new Date(Date.parse(config.fromDate));
      }
      if (config.untilDate) {
        this.untilDate = new Date(Date.parse(config.untilDate));
      }
    }
  }
}
