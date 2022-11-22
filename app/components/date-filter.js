import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import dateAndTimeToJsDate from '../utils/date-and-time-to-js-date';
import jsDateToDateAndTime from '../utils/js-date-to-date-and-time';

export default class DateFilterComponent extends Component {
  @service dateFilter;

  @tracked fromDate;
  @tracked untilDate;

  constructor() {
    super(...arguments);
    this.fromDate = jsDateToDateAndTime(this.dateFilter.fromDate)[0];
    this.untilDate = jsDateToDateAndTime(this.dateFilter.untilDate)[0];
  }

  @action
  setFromDate(e) {
    this.fromDate = e.target.value;
    this.dateFilter.setFromDate(dateAndTimeToJsDate(this.fromDate, '00:00'));
  }

  @action
  setUntilDate(e) {
    this.untilDate = e.target.value;
    this.dateFilter.setUntilDate(dateAndTimeToJsDate(this.untilDate, '00:00'));
  }
}
