import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class PeopleController extends Controller {
  @service store;
  @service router;

  @tracked givenName;
  @tracked familyName;
  @tracked defaultGroup;

  get isInvalid() {
    return isEmpty(this.givenName) || isEmpty(this.familyName);
  }

  @action
  async createPerson(e) {
    e.preventDefault();
    const person = this.store.createRecord('person', {
      givenName: this.givenName,
      familyName: this.familyName,
      groups: [ this.defaultGroup ],
    });
    await person.save();

    this.router.refresh();
  }

  @action
  setGivenName(e) {
    this.givenName = e.target.value;
  }

  @action
  setFamilyName(e) {
    this.familyName = e.target.value;
  }
}
