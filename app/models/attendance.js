import Model, { attr, belongsTo } from '@ember-data/model';
import CONSTANTS from '../config/constants';

export default class AttendanceModel extends Model {
  @attr('string') status;
  @attr('string') category;

  @belongsTo('event', { inverse: 'attendances', async: true }) event;
  @belongsTo('person', { inverse: 'person', async: true }) person;

  get isPresent() {
    return this.status == CONSTANTS.ATTENDANCE_STATUSES.PRESENT;
  }

  get isAbsent() {
    return this.status == CONSTANTS.ATTENDANCE_STATUSES.ABSENT;
  }

  get isUnknown() {
    return this.status == CONSTANTS.ATTENDANCE_STATUSES.UNDEFINED;
  }

  get isTooLate() {
    return this.category == CONSTANTS.ATTENDANCE_CATEGORIES.TOO_LATE;
  }
}
