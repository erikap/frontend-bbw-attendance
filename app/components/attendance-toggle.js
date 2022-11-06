import Component from '@glimmer/component';
import { action } from '@ember/object';
import CONSTANTS from '../config/constants';

export default class AttendanceToggleComponent extends Component {
  @action
  async togglePresence() {
    await this._toggleStatus(CONSTANTS.ATTENDANCE_STATUSES.PRESENT);
  }

  @action
  async toggleAbsenceWithoutReason() {
    await this._toggleStatus(CONSTANTS.ATTENDANCE_STATUSES.ABSENT_WITHOUT_REASON);
  }

  @action
  async toggleAbsenceWithReason() {
    await this._toggleStatus(CONSTANTS.ATTENDANCE_STATUSES.ABSENT_WITH_REASON);
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
