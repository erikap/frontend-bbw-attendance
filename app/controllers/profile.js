import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';
import { task } from 'ember-concurrency';
import { isEmpty } from '@ember/utils';

export default class ProfileController extends Controller {
  @tracked errorMessage;
  @tracked oldPassword;
  @tracked newPassword;
  @tracked newPasswordConfirmation;

  get isInvalid() {
    return [this.oldPassword, this.newPassword, this.newPasswordConfirmation].any(v => isEmpty(v));
  }

  @task
  *changePassword(e) {
    e.preventDefault();
    this.errorMessage = null;
    const response = yield fetch('/accounts/current/changePassword', {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: {
          type: 'accounts',
          id: 'current',
          attributes: {
            'old-password': this.oldPassword,
            'new-password': this.newPassword,
            'new-password-confirmation': this.newPasswordConfirmation,
          }
        }
      }),
    });

    if (!response.ok) {
      this.errorMessage = 'Er is iets misgelopen. Probeer opnieuw.';
      const error = yield response.json();
      console.warn(`Failed to change password: [${response.statusText}] ${JSON.stringify(error)}`);
      return false;
    } else {
      this.oldPassword = null;
      this.newPassword = null;
      this.newPasswordConfirmation = null;
      return true;
    }
  }
}
