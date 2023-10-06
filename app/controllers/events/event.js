import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import CONSTANTS from '../../config/constants';
import dateAndTimeToJsDate from '../../utils/date-and-time-to-js-date';
import jsDateToDateAndTime from '../../utils/js-date-to-date-and-time';

export default class EventsEventController extends Controller {
  @service store;
  @service router;

  @tracked isEditing = false;
  @tracked isOpenPersonPickerModal = false;
  @tracked date;
  @tracked time;

  get isInvalid() {
    return (
      isEmpty(this.model.event.name) || isEmpty(this.model.event.startDate)
    );
  }

  get presentCount() {
    return this.model.attendances.filter((a) => a.isPresent).length;
  }

  get absentCount() {
    return this.model.attendances.filter((a) => a.isAbsent).length;
  }

  get unknownCount() {
    return this.model.attendances.filter((a) => a.isUnknown).length;
  }

  resetDateAndTime(jsDate) {
    [this.date, this.time] = jsDateToDateAndTime(jsDate);
  }

  @action
  async addAttendance(person) {
    const attendance = this.store.createRecord('attendance', {
      status: CONSTANTS.ATTENDANCE_STATUSES.UNDEFINED,
      event: this.model.event,
      person: person,
    });
    await attendance.save();
    this.isOpenPersonPickerModal = false;
    this.router.refresh('events.event');
  }

  @action
  async updateEvent(e) {
    e.preventDefault();
    await this.model.event.save();
    this.isEditing = false;
  }

  @action
  setEventName(e) {
    this.model.event.name = e.target.value;
  }

  @action
  setEventDate(e) {
    this.date = e.target.value;
    this.model.event.startDate = dateAndTimeToJsDate(this.date, this.time);
  }

  @action
  setEventTime(e) {
    this.time = e.target.value;
    this.model.event.startDate = dateAndTimeToJsDate(this.date, this.time);
  }

  @action
  openEditMode() {
    this.isEditing = true;
  }

  @action
  cancelEditMode() {
    this.model.event.rollbackAttributes();
    this.isEditing = false;
  }

  @task
  *deleteAttendance(attendance) {
    yield attendance.destroyRecord();
  }

  @action
  openPersonPickerModal() {
    this.isOpenPersonPickerModal = true;
  }

  @action
  closePersonPickerModal() {
    this.isOpenPersonPickerModal = false;
  }
}
