import Controller from '@ember/controller';
import ENV from 'frontend-bbw-attendance/config/environment';

export default class LoginController extends Controller {
  get logoImageName() {
    return `logo-${ENV.theme.primary}.jpg`;
  }
}
