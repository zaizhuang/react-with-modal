import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Modal from '../src/components/Modal';

describe('Modal', function() {
    beforeEach(function () {
        this.closeFunc = sinon.spy();
        this.openFunc = sinon.spy();
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

    describe('when isOpen is unchanged when props are received', function () {
        it('should not trigger open or close', function() {
            this.component.setProps({isOpen: false});
            expect(this.closeFunc.called).to.equal(false);
            expect(this.component.state('isOpen')).to.equal(false);
        });
    });

    describe('when open (isOpen goes from false -> true)', function () {
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

        it('should close if modal is clicked', function () {
            this.component.find('.modal').simulate('click');
            expect(this.closeFunc.called).to.equal(true);
        });

        it('should not close if modal-dialog is clicked', function () {
            this.component.find('.modal-dialog').simulate('click');
            expect(this.closeFunc.called).to.equal(false);
        });

        describe('after 0ms', function () {
            it('modal should fade in', function(done) {
                setTimeout(() => {
                    expect(this.component.find('.modal.fade.in').length).to.equal(1);
                    done();
                }, 0);
            });

            it('modal state.isFadeIn should be true ', function(done) {
                setTimeout(() => {
                    expect(this.component.state('isFadeIn')).to.equal(true);
                    done();
                }, 0);
            });

        });

        describe('and close button is pressed', function () {
            it('this.props.close is triggered', function() {
                this.component.find('button').simulate('click');
                expect(this.closeFunc.called).to.equal(true);
            });
        });

        describe('and key is pressed', function () {
            it('this.props.close is triggered when esc is pressed', function() {
                let event = new window.KeyboardEvent('keydown', {
                    keyCode: 27
                });
                document.dispatchEvent(event);
                expect(this.closeFunc.called).to.equal(true);
            });
            it('this.props.close is not triggered when esc is not pressed', function() {
                let event = new window.KeyboardEvent('keydown', {
                    keyCode: 13
                });
                document.dispatchEvent(event);
                expect(this.closeFunc.called).to.equal(false);
            });
        });

        describe('when isOpen goes from true -> false', function () {
            beforeEach(function () {
                this.component.setProps({isOpen: false});
            });

            it('modal state.isFadeIn should be false ', function() {
                expect(this.component.state('isFadeIn')).to.equal(false);
            });

            it('modal state.isOpen should still be true ', function() {
                expect(this.component.state('isOpen')).to.equal(true);
            });

            describe('after 300ms', function () {
                it('modal state.isOpen should be set to false', function(done) {
                    setTimeout(() => {
                        expect(this.component.state('isOpen')).to.equal(false);
                        done();
                    }, 300);
                });

                it('body should not have modal-open class', function(done) {
                    setTimeout(() => {
                        expect(document.body.className).to.equal('');
                        done();
                    }, 300);
                });
            });

        });
    });
});
