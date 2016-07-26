react-bootstrap-modal-wrapper
=============================
A [React](http://facebook.github.io/react/index.html) modal component for [Bootstrap v4](http://v4-alpha.getbootstrap.com/).

## Usage
Install it from NPM:
```javascript
npm install --save react-bootstrap-modal-wrapper
```
Then import react-bootstrap-modal-wrapper and use it like this:
```javascript
// component with modal
import React from 'react';
import {
  Modal
  withModal,
  propTypes as modalPropTypes
} from 'react-bootstrap-modal-wrapper'; 

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


## Demo & Examples

To build the examples locally, clone this repo and run:

```javascript
npm install
webpack-dev-server
```
and then navigate to [http://localhost:8080/examples/](http://localhost:8080/examples/)
