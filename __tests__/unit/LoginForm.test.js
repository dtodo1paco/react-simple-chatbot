jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

const LoginForm = require('components/LoginForm').default;

/**

 Given properties and state, what structure our rendered tree will have?

 Given an output of render, is there a possibility to transition from state A to state B?

 */

describe('LoginForm testing...', () => {
    /** CUSTOM FOR COMPONENT **/
    const exampleUser = {
        username: "testun",
        password: "supersecret"
    };

    const handler = jest.fn();

    // HELPERS
    let getErrors = () =>
        TestUtils.scryRenderedDOMComponentsWithClass(component, ['visible','errorMessage']);
    /** CUSTOM FOR COMPONENT **/

    let component = null;
    /*
     let renderedDOM = () => ReactDOM.findDOMNode(component);
     let submitButton = () => ReactDOM.findDOMNode(component.refs['login-submit-button']);;
     */
    beforeEach(function() {
        component = TestUtils.renderIntoDocument(<LoginForm handler={handler} />);
    });

    describe('render', () => {
        it('snapshot', () => {
            const wrapper = shallow(<LoginForm />);
            expect(wrapper).toMatchSnapshot();
        });
        it('has 2 fields and 1 button', () => {
            const fields = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
            expect(fields.length).toEqual(2);
            const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
            expect(buttons.length).toEqual(1);
        });
    });
    describe('behavoir', () => {
        it('show error when form submit with empty values', () => {
            expect(getErrors().length).toEqual(0);
            const form = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
            TestUtils.Simulate.submit(form);
            expect(getErrors().length).toEqual(2);
            expect(component.state['error']).toBeTruthy();
        });
        it('call login handler when submit', () => {
            expect(handler).toHaveBeenCalledTimes(0);
            const inputs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
            TestUtils.Simulate.change(inputs[0], {target: {value: exampleUser.username}});
            TestUtils.Simulate.change(inputs[1], {target: {value: exampleUser.password}});
            expect(component.state['inputs'][0].value).toBe(exampleUser.username);
            expect(component.state['inputs'][1].value).toBe(exampleUser.password);

            const form = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
            TestUtils.Simulate.submit(form);
            expect(handler).toHaveBeenCalledTimes(1);
            expect(component.state['error']).toBeFalsy();
        });

    });
});

/**
 console.log("Errors: " + renderedDOM().querySelectorAll('.visible').length);
**/