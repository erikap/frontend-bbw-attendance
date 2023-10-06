import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, all } from 'ember-concurrency';
import { isEmpty } from '@ember/utils';
import CONSTANTS from '../../config/constants';
import dateAndTimeToJsDate from '../../utils/date-and-time-to-js-date';

export default class EventsIndexController extends Controller {
  @service store;
  @service router;

  @tracked name;
  @tracked date;
  @tracked time;

  get isInvalid() {
    return isEmpty(this.name) || isEmpty(this.date) || isEmpty(this.time);
  }

  @task
  *createEvent(e) {
    e.preventDefault();
    const event = this.store.createRecord('event', {
      name: this.name,
      startDate: dateAndTimeToJsDate(this.date, this.time),
    });
    yield event.save();

    yield all(
      this.model.persons.map((person) => {
        const attendance = this.store.createRecord('attendance', {
          status: CONSTANTS.ATTENDANCE_STATUSES.UNDEFINED,
          person: person,
          event: event,
        });
        return attendance.save();
      }),
    );

    this.router.transitionTo('events.event', event.id);
  }

  @action
  setEventName(e) {
    this.name = e.target.value;
  }

  @action
  setEventDate(e) {
    this.date = e.target.value;
  }

  @action
  setEventTime(e) {
    this.time = e.target.value;
  }
}
