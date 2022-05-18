import Model, { attr, hasMany } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') givenName;
  @attr('string') familyName;

  @hasMany('attendance') attendances;
}
