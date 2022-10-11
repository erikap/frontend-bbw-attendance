import dateAndTimeToJsDate from 'frontend-bbw-attendance/utils/date-and-time-to-js-date';
import { module, test } from 'qunit';

module('Unit | Utility | date-and-time-to-js-date', function () {
  // TODO: Replace this with your real tests.
  test('it works', function (assert) {
    let result = dateAndTimeToJsDate();
    assert.ok(result);
  });
});
