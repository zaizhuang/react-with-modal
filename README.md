react-with-modal
=============================
A lightweight [React](http://facebook.github.io/react/index.html) modal component for [Bootstrap v4](http://v4-alpha.getbootstrap.com/).

## Use this bootstrap modal component if:
- You want a lightweight component. It has no external dependencies except for React.
- You use Bootstrap v4.
- You prefer using higher order components to keep state out of your UI components.

## Installation
```javascript
npm install --save react-with-modal
```
## Usage
react-with-modal requires you to wrap the component that has the modal with `withModal`, which passes the `modalProps` property to the wrapped component.

`modalProps` has the following shape:

|Property| Type| Description|
|--------|-----| -----------|
|open|Function|Call this function to open the modal. Does not take any arguments.|
|close|Function|Call this function to close the modal. Does not take any arguments.|
|isOpen|Boolean|True when the modal is open and false otherwise|

You have to pass the modalProps into the Modal component to be able to open/close it:
```javascript
// component with modal
import React from 'react';
import {
  Modal
  withModal,
  propTypes as modalPropTypes
} from 'react-with-modal';

class Example extends React.Component {
  static propTypes = {
    modalProps: React.PropTypes.shape({
      close: modalPropTypes.close,
      open: modalPropTypes.open
    })
  }

  render () {
    <div>
      <Modal {...this.props.modalProps}>
        <div>
          <button onClick={this.props.modalProps.close}>
            Close Modal
          </button>
        </div>
      </Modal>
      <button onClick={this.props.modalProps.open}>
        Open Modal
      </button>
    </div>
  }
}

// wrap the component with the modal wrapper
export default withModal(Example);
```

## Styling

[Bootstrap v4](http://v4-alpha.getbootstrap.com/) styles aren't included automatically with this component, and you need to add it to your app separately.

## Demo & Examples

To build the examples locally, clone this repo and run:

```javascript
npm install
webpack-dev-server
```
and then navigate to [http://localhost:8080/examples/](http://localhost:8080/examples/)
