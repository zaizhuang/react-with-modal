import React from 'react';
import sinon from 'sinon';
import jsdom from 'jsdom';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Modal from '../src/components/Modal';

describe('Modal', function() {
    beforeEach(function () {
        this.closeFunc = sinon.spy();
        this.component = mount(
            <Modal isOpen={false} close={this.closeFunc}>
                <div><button onClick={this.closeFunc}/></div>
            </Modal>
        );
    });

    afterEach(function () {
        this.component.unmount();
    });

    describe('defaults', function () {
        it('should have class of modal-lg', function() {
            expect(this.component.find('.modal-lg').length).to.equal(1);
        });
    });

    describe('when closed (isOpen is false)', function () {
        it('.modal should not have "in" class', function() {
            expect(this.component.find('.modal.fade.in').length).to.equal(0);
        });

        it('.modal-backdrop should not be present', function() {
            expect(this.component.find('.modal-backdrop').length).to.equal(0);
        });
    });

    describe('when open (isOpen is true)', function () {
        beforeEach(function () {
            this.component.setProps({isOpen: true});
        });

        it('.modal state.isOpen should be set to true ', function() {
            expect(this.component.state('isOpen')).to.equal(true);
        });

        it('modal state.isFadeIn should be false ', function() {
            expect(this.component.state('isFadeIn')).to.equal(false);
        });

        it('.modal-backdrop should be present', function() {
            expect(this.component.find('.modal-backdrop').length).to.equal(1);
        });

        it('document.body should have modal-open class', function() {
            expect(document.body.className).to.equal(' modal-open');
        });

        it('modal should not fade in', function() {
            expect(this.component.find('.modal.fade.in').length).to.equal(0);
        });

        describe('after 300ms', function () {
            this.timeout(300);

            it('modal should fade in', function() {
                expect(this.component.find('.modal.fade.in').length).to.equal(1);
            });

            it('modal state.isFadeIn should be true ', function() {
                expect(this.component.state('isFadeIn')).to.equal(true);
            });

        });

        describe('and close button is pressed', function () {
            it('this.props.close is triggered', function() {
                this.component.find('button').simulate('click');
                expect(this.closeFunc.called).to.equal(true);
            });
        });
        describe('and esc button is pressed', function () {
            it('this.props.close is triggered', function() {
                let event = new window.KeyboardEvent('keydown', {
                    keyCode: 27
                });
                document.dispatchEvent(event);
                expect(this.closeFunc.called).to.equal(true);
            });
        });
    });

});
