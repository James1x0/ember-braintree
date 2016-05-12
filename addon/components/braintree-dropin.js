/* global braintree */

import Em from 'ember';

export default Em.Component.extend({
  action: 'processBraintreeNonce',
  token: null,
  braintreeOptions: {},

  _setup: function() {
    var handler = Em.run.bind(this, this._handler),
        token = this.get('token');

    braintree.setup(token, 'dropin', Em.$.extend({
      container: this.elementId,
      paymentMethodNonceReceived: handler
    }, this.get('braintreeOptions')));
  }.on('didInsertElement'),

  _handler: function(event, nonce) {
    this.sendAction('action', nonce);
    return false;
  }
});
