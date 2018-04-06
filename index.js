/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-braintree',

  contentFor (type) {
    if (type === 'body') {
      return '<script src="https://js.braintreegateway.com/web/dropin/1.10.0/js/dropin.min.js"></script>';
    }
  }
};
