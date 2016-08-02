import React from 'react';

import {
    Modal,
    withModal,
    propTypes as modalPropTypes
} from 'react-with-modal';

class App extends React.Component {
    static propTypes = {
        // from modal wrapper
        modalProps: React.PropTypes.shape({
            close: modalPropTypes.close,
            open: modalPropTypes.open
        })
    }

    render () {
        return (
            <div className="container m-t-2">
                <h3>Demo</h3>
                <div>
                    <Modal {...this.props.modalProps}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    onClick={this.props.modalProps.close}
                                >
                                    &times;
                                </button>
                                <h4 className="modal-title">Modal Title</h4>
                            </div>
                            <div className="modal-body">
                                Body
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={this.props.modalProps.close}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Modal>
                    <button
                        className="btn btn-primary"
                        onClick={this.props.modalProps.open}
                    >
                        Show modal
                    </button>
                </div>
                <p className="m-t-2">Notes:</p>
                <ul>
                    <li>A <code>modal-open</code> class is added to body when modal is open.</li>
                    <li>Modal closes when 'esc' key is pressed, or a click happens outside of <code>modal-dialog</code>.</li>
                    <li>Unlike Bootstrap, padding is not added to prevent screen width from changing due to scroll bar being hidden.</li>
                </ul>
                <div>
                    <h3 className="m-t-2">Code</h3>
                    <p>
                    </p>
                    <pre>
                        <code className="language-javascript">{`import {
    Modal,
    withModal,
    propTypes as modalPropTypes
} from 'react-with-modal';

class ButtonContainer extends React.Component {
  static propTypes = {
    modalProps: React.PropTypes.shape({
      close: modalPropTypes.close,
      open: modalPropTypes.open
    })
  }
  render () {
    return (
      <div>
        <Modal {...this.props.modalProps}>
          <div className="modal-content">
            <div className="modal-header">
              // header content
            </div>
            <div className="modal-body">
              // body content
            </div>
            <div className="modal-footer">
              <button
                onClick={this.props.modalProps.close}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
        <button
          onClick={this.props.modalProps.open}
        >
          Show modal
        </button>
      </div>
    );
  }
}`}</code>
                    </pre>
                </div>
            </div>
        );
    }
}

const AppWithModal = withModal(App);

export default AppWithModal;
