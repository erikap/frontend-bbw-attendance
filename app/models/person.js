import Model, { attr, hasMany } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') givenName;
  @attr('string') familyName;

  @hasMany('attendance', { inverse: 'person', async: true }) attendances;
  @hasMany('group', { inverse: 'members', async: true }) groups;

  get fullName() {
    return [this.givenName, this.familyName].join(' ').trim();
  }
}
