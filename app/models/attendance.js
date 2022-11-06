import Model, { attr, belongsTo } from '@ember-data/model';
import CONSTANTS from '../config/constants';

export default class AttendanceModel extends Model {
  @attr('string') status;

  @belongsTo('event') event;
  @belongsTo('person') person;

  get isPresent() {
    return this.status == CONSTANTS.ATTENDANCE_STATUSES.PRESENT;
  }

  get isAbsentWithReason() {
    return this.status == CONSTANTS.ATTENDANCE_STATUSES.ABSENT_WITH_REASON;
  }

  get isAbsentWithoutReason() {
    return this.status == CONSTANTS.ATTENDANCE_STATUSES.ABSENT_WITHOUT_REASON;
  }

  get isAbsent() {
    return this.isAbsentWithoutReason || this.isAbsentWithReason;
  }

  get isUnknown() {
    return this.status == CONSTANTS.ATTENDANCE_STATUSES.UNDEFINED;
  }
}
