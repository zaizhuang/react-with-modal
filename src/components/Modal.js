/* global document */
import React from 'react';

class Modal extends React.Component {
    static propTypes = {
        size: React.PropTypes.string,
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.element
        ]).isRequired,

        // from modal wrapper
        isOpen: React.PropTypes.bool.isRequired,
        close: React.PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
        this.onEscKeyDown = this.onEscKeyDown.bind(this);
        this.state = {
            isOpen: false,
            isFadeIn: false
        };
    }

    componentWillUnmount() {
        this.cleanUp();
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.isOpen === nextProps.isOpen)
            return;

        if (nextProps.isOpen)
            this.open();
        else
            this.close();
    }

    setUp () {
        if (document && document.body) {
            var orig = document.body.className;
            document.body.className = orig + ' modal-open';
            //this.props.listeners.add('keydown', this.onEscKeyDown);
        }
    }

    cleanUp () {
        if (document && document.body) {
            document.body.className = document.body.className.replace(/ ?modal-open/, '');
            //this.props.listeners.removeAll();
        }
    }

    open () {
        this.setUp();
        this.setState({ isOpen: true });

        //this.props.setTimeout(() => {
        //    this.setState({ isFadeIn: true });
        //}, 0);
    }

    close () {
        this.setState({ isFadeIn: false });

        //this.props.setTimeout(() => {
        //    this.setState({ isOpen: false });
        //    this.cleanUp();
        //}, 300);
    }

    onEscKeyDown (evt) {
        if (evt.keyCode !== 27)
            return;

        this.props.close();
    }

    handleClick (evt) {
        if (evt.target !== this.refs.modalContainer)
            return;

        evt.preventDefault();
        this.props.close();
    }


    render () {
        return (
            <div>
                <div>
                    <div
                        ref="modalContainer"
                        onClick={this.handleClick.bind(this)}
                        className={`modal fade ${this.state.isFadeIn ? 'in' : ''}`}
                        style={{display: this.state.isOpen ? 'block' : 'none'}}
                    >
                        <div className={`modal-dialog modal-${this.props.size || 'lg'}`}>
                            <div className="modal-content">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen ?
                    <div className={`modal-backdrop fade ${this.state.isFadeIn ? 'in' : ''}`}></div> : null
                }
            </div>
        );
    }
}

export default Modal;
