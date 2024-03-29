import EmberRouter from '@ember/routing/router';
import config from 'frontend-bbw-attendance/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('people', function () {
    this.route('person', { path: ':person_id' });
  });
  this.route('events', function () {
    this.route('event', { path: ':event_id' });
  });
  this.route('profile');
  this.route('stats');
});
