/* global braintree */
import Component from '@ember/component';

export default Component.extend({
  authorization: null,
  braintreeOptions: null,

  didInsertElement () {
    this.attach();
  },

  willDestroy () {
    this.teardown();
  },

  callIfAvailable (methodName, arg) {
    const method = this.get(methodName);

    if (method && typeof method === 'function') {
      method(arg);
    }
  },

  attach () {
    const authorization = this.get('authorization'),
          opts          = this.get('braintreeOptions') || {},
          callReq       = this.get('callOnRequestable') === true || this.get('onNonce');

    if (!authorization) {
      return;
    }

    braintree.dropin.create(Object.assign({
      authorization,
      container: `#${this.get('elementId')}`
    }, opts)).then(instance => {
      this.set('__btInstance', instance);

      this.callIfAvailable('updateRequestable', instance.requestPaymentMethod);
      this.callIfAvailable('updateInstance', instance);

      if (callReq || this.get('onRequestable')) {
        instance.on('paymentMethodRequestable', event => {
          this.callIfAvailable('onRequestable', event);

          if (callReq) {
            instance.requestPaymentMethod()
              .then(payload => this.callIfAvailable('onNonce', payload.nonce))
              .catch(err => this.callIfAvailable('onNonceError', err));
          }
        });
      }
    });
  },

  teardown () {
    const btInstance = this.get('__btInstance');

    if (btInstance && btInstance.teardown) {
      btInstance.teardown();
    }
  }
});
