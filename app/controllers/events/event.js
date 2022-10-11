import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default class EventsEventController extends Controller {
  get presentCount() {
    return this.model.attendances.filterBy('isPresent').length;
  }

  get absentCount() {
    return this.model.attendances.filterBy('isAbsent').length;
  }

  get unknownCount() {
    return this.model.attendances.filterBy('isUnknown').length;
  }

  @task
  *deleteAttendance(attendance) {
    yield attendance.destroyRecord();
  }
}
