import Model, { attr, belongsTo } from '@ember-data/model';

export default class AttendanceModel extends Model {
  @attr('string') status;

  @belongsTo('event') event;
  @belongsTo('person') person;
}
