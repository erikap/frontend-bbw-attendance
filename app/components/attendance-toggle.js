import Component from '@glimmer/component';
import { action } from '@ember/object';
import {
  STATUS_UNDEFINED,
  STATUS_PRESENT,
  STATUS_ABSENT,
} from '../models/attendance';

export default class AttendanceToggleComponent extends Component {
  @action
  async togglePresence() {
    if (this.args.attendance.status == STATUS_PRESENT) {
      this.args.attendance.status = STATUS_UNDEFINED;
    } else {
      this.args.attendance.status = STATUS_PRESENT;
    }
    await this.args.attendance.save();
  }

  @action
  async toggleAbsence() {
    if (this.args.attendance.status == STATUS_ABSENT) {
      this.args.attendance.status = STATUS_UNDEFINED;
    } else {
      this.args.attendance.status = STATUS_ABSENT;
    }
    await this.args.attendance.save();
  }
}
