import Model, { attr, hasMany } from '@ember-data/model';

export default class EventModel extends Model {
  @attr('string') name;
  @attr('datetime') startDate;

  @hasMany('attendance', { inverse: 'event', async: true }) attendances;
}
