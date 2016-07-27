import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';

import withModal from '../src/wrappers/withModal';


class TestComponent extends React.Component {
    render () {
        return (
            <div>test</div>
        )
    }
}

const TestComponentWithModal = withModal(TestComponent);

describe('withModal', function() {
    beforeEach(function () {
        this.component = mount(
            <TestComponentWithModal/>
        );
        this.wrappedComponent = this.component.find(TestComponent).first();
    });

    afterEach(function () {
        this.component.unmount();
    });

    describe('defaults', function () {
        it('should pass isOpen = false into wrapped component', function() {
            expect(this.wrappedComponent.props().modalProps.isOpen).to.equal(false);
        });
    });

    describe('when open is triggered', function () {
        beforeEach(function () {
            this.event = {
                preventDefault: sinon.spy()
            }
            this.wrappedComponent.props().modalProps.open(this.event);
        });

        it('should set isOpen = true', function() {
            expect(this.wrappedComponent.props().modalProps.isOpen).to.equal(true);
        });

        it('should call evt.preventDefault when present', function() {
            expect(this.event.preventDefault.called).to.equal(true);
        });

        describe('and close is triggered', function () {
            beforeEach(function () {
                this.event = {
                    preventDefault: sinon.spy()
                }
                this.wrappedComponent.props().modalProps.close(this.event);
            });

            it('should set isOpen = false', function() {
                this.wrappedComponent.props().modalProps.close();
                expect(this.wrappedComponent.props().modalProps.isOpen).to.equal(false);
            });

            it('should call evt.preventDefault', function() {
                this.wrappedComponent.props().modalProps.close();
                expect(this.event.preventDefault.called).to.equal(true);
            });
        });
    });
});
