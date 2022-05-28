import Controller from '@ember/controller';
import ENV from 'frontend-bbw-attendance/config/environment';

export default class LoginController extends Controller {
  get primaryTheme() {
    return ENV.theme.primary;
  }
}
