import Model, { attr, hasMany } from '@ember-data/model';

export default class GroupModel extends Model {
  @attr('string') uri;
  @attr('string') name;

  @hasMany('person', { inverse: 'groups', async: true }) members;
}
