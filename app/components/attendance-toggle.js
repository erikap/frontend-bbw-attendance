import Component from '@glimmer/component';
import { action } from '@ember/object';
import CONSTANTS from '../config/constants';

export default class AttendanceToggleComponent extends Component {
  @action
  async togglePresence() {
    if (this.args.attendance.status == CONSTANTS.ATTENDANCE_STATUSES.PRESENT) {
      this.args.attendance.status = CONSTANTS.ATTENDANCE_STATUSES.UNDEFINED;
    } else {
      this.args.attendance.status = CONSTANTS.ATTENDANCE_STATUSES.PRESENT;
    }
    await this.args.attendance.save();
  }

  @action
  async toggleAbsence() {
    if (this.args.attendance.status == CONSTANTS.ATTENDANCE_STATUSES.ABSENT) {
      this.args.attendance.status = CONSTANTS.ATTENDANCE_STATUSES.UNDEFINED;
    } else {
      this.args.attendance.status = CONSTANTS.ATTENDANCE_STATUSES.ABSENT;
    }
    await this.args.attendance.save();
  }
}
