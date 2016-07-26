/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import Modal from 'src/components/Modal';
import withModal, {propTypes as modalPropTypes} from 'src/wrappers/withModal';

class Example extends React.Component {
    static propTypes = {
        // from modal wrapper
        modalProps: React.PropTypes.shape({
            close: modalPropTypes.close,
            open: modalPropTypes.open
        })
    }
    render () {
        return (
            <div className="container">
                <h1 className="m-t-1">
                    react-bootstrap-modal-wrapper examples
                </h1>
                <Modal {...this.props.modalProps}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={this.props.modalProps.close}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Modal title</h4>
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
        );
    }
}

const ExampleWithModal = withModal(Example);

ReactDOM.render(
    <ExampleWithModal />,
    document.getElementById('app')
);
