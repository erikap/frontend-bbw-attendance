import Model, { attr, belongsTo } from '@ember-data/model';

const STATUS_UNDEFINED =
  'http://data.bbw.craps.cloud/attendance-statuses/undefined';
const STATUS_PRESENT =
  'http://data.bbw.craps.cloud/attendance-statuses/present';
const STATUS_ABSENT = 'http://data.bbw.craps.cloud/attendance-statuses/absent';

export default class AttendanceModel extends Model {
  @attr('string') status;

  @belongsTo('event') event;
  @belongsTo('person') person;

  get isPresent() {
    return this.status == STATUS_PRESENT;
  }

  get isAbsent() {
    return this.status == STATUS_ABSENT;
  }

  get isUnknown() {
    return this.status == STATUS_UNDEFINED;
  }
}

export { STATUS_UNDEFINED, STATUS_PRESENT, STATUS_ABSENT };
