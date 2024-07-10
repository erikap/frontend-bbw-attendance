import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { task } from 'ember-concurrency';

export default class PeoplePersonController extends Controller {
  @tracked isEditing = false;

  get isInvalid() {
    return (
      isEmpty(this.model.person.givenName) ||
      isEmpty(this.model.person.familyName)
    );
  }

  get totalCount() {
    return this.model.attendances.length;
  }

  get presentCount() {
    return this.model.attendances.filter((a) => a.isPresent).length;
  }

  get presentPercentage() {
    return Math.round((this.presentCount / this.totalCount) * 100);
  }

  get tooLateCount() {
    return this.model.attendances.filter((a) => a.isTooLate).length;
  }

  get tooLatePercentage() {
    return Math.round((this.tooLateCount / this.presentCount) * 100);
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

  @task
  *deleteAttendance(attendance) {
    yield attendance.destroyRecord();
  }
}
