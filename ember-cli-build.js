'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    minifyCSS: {
      enabled: false
    },
    svgJar: {
      sourceDirs: ['public', 'node_modules/remixicon/icons'],
    },
  });

  return app.toTree();
};
