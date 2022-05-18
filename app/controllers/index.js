import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class IndexController extends Controller {
  @service store;
  @service router;

  @tracked name;
  @tracked date;
  @tracked time;

  get isInvalid() {
    return isEmpty(this.name) && isEmpty(this.date) && isEmpty(this.time);
  }

  @action
  async createEvent(e) {
    e.preventDefault();
    const event = this.store.createRecord('event', {
      name: this.name,
      startDate: new Date(Date.parse(`${this.date}T${this.time}:00`)),
    });
    await event.save();

    // TODO create attendances for all persons

    this.router.transitionTo('event', event.id);
  }

  @action
  setEventName(e) {
    this.name = e.target.value;
  }

  @action
  setEventDate(e) {
    this.date = e.target.value;
  }

  @action
  setEventTime(e) {
    this.time = e.target.value;
  }
}
