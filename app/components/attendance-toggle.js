import Component from '@glimmer/component';
import { action } from '@ember/object';
import CONSTANTS from '../config/constants';

export default class AttendanceToggleComponent extends Component {
  @action
  async togglePresence() {
    await this._toggleStatus(CONSTANTS.ATTENDANCE_STATUSES.PRESENT);
  }

  @action
  async toggleAbsence() {
    await this._toggleStatus(CONSTANTS.ATTENDANCE_STATUSES.ABSENT);
  }

  async _toggleStatus(status) {
    if (this.args.attendance.status == status) {
      this.args.attendance.status = CONSTANTS.ATTENDANCE_STATUSES.UNDEFINED;
    } else {
      this.args.attendance.status = status;
    }
    await this.args.attendance.save();
  }
}
