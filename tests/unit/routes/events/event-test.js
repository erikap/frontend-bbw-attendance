import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | events/event', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:events/event');
    assert.ok(route);
  });
});
