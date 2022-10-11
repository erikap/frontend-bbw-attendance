import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class PeoplePersonController extends Controller {
  @tracked isEditing = false;

  get isInvalid() {
    return isEmpty(this.model.person.givenName) || isEmpty(this.model.person.familyName);
  }

  @action
  async updatePerson(e) {
    e.preventDefault();
    await this.model.person.save();
    this.isEditing = false;
  }

  @action
  setGivenName(e) {
    this.model.person.givenName = e.target.value;
  }

  @action
  setFamilyName(e) {
    this.model.person.familyName = e.target.value;
  }

  @action
  openEditMode() {
    this.isEditing = true;
  }

  @action
  cancelEditMode() {
    this.model.person.rollbackAttributes();
    this.isEditing = false;
  }
}
