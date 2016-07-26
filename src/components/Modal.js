/* global document, window */

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
        this.fadeIn = this.fadeIn.bind(this);
        this.cleanUp = this.cleanUp.bind(this);
        this.state = {
            isOpen: false,
            isFadeIn: false
        };
        this.timerIds = [];
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
        document.body.className = document.body.className + ' modal-open';
        document.addEventListener('keydown', this.onEscKeyDown);
    }

    cleanUp () {
        this.setState({ isOpen: false });

        document.body.className = document.body.className.replace(/ ?modal-open/, '');
        document.removeEventListener('keydown', this.onEscKeyDown);

        this.timerIds.forEach((timerId) => {
            window.clearTimeout(timerId);
        });
    }

    open () {
        this.setUp();
        this.setState({ isOpen: true });
        this.timerIds.push(window.setTimeout(this.fadeIn, 0));
    }

    close () {
        this.setState({ isFadeIn: false });

        // delay cleanup so animations can complete before closing
        this.timerIds.push(window.setTimeout(this.cleanUp, 300));
    }

    fadeIn () {
        this.setState({ isFadeIn: true });
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
