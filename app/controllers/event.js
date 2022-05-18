import Controller from '@ember/controller';

export default class EventController extends Controller {
  get presentCount() {
    return this.model.attendances.filterBy('isPresent').length;
  }

  get absentCount() {
    return this.model.attendances.filterBy('isAbsent').length;
  }

  get unknownCount() {
    return this.model.attendances.filterBy('isUnknown').length;
  }
}
