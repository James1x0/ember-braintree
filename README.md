# ember-cli-braintree

Braintree's Drop-In Payment UI as an Ember component. (using the V3 client)

## Installation

```bash
yarn add ember-cli-braintree
```

## Usage

```hbs
{{braintree-dropin authorization=braintreeClientToken onNonce=(action 'myAction')}}
```

## Events
#### updateRequestable
Returns `requestPaymentMethod` function from braintree

#### updateInstance
Returns braintree instance

#### onRequestable
Returns a braintree event

### onNonce
When action is specified, the component calls "requestPaymentMethod" onRequestable, and then updates the nonce
