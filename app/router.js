import EmberRouter from '@ember/routing/router';
import config from 'frontend-bbw-attendance/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('event', { path: 'events/:event_id' });
});
