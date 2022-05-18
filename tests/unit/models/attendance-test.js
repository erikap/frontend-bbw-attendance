import { module, test } from 'qunit';
import { setupTest } from 'frontend-bbw-attendance/tests/helpers';

module('Unit | Model | attendance', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('attendance', {});
    assert.ok(model);
  });
});
