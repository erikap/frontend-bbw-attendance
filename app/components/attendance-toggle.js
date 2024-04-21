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

  @action
  async toggleTooLate() {
    if (this.args.attendance.isTooLate) {
      this.args.attendance.category = null;
    } else {
      this.args.attendance.category = CONSTANTS.ATTENDANCE_CATEGORIES.TOO_LATE;
    }
    await this.args.attendance.save();
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
