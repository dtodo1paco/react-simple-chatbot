jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

const SignupForm = require('components/SignupForm').default;

describe('SignupForm testing...', () => {
    /** CUSTOM FOR COMPONENT **/
    const exampleUser = {
        username: "testun",
        password: "supersecret",
        nickname: "pokemon"
    };

    const handler = jest.fn();

    // HELPERS
    let getErrors = () =>
        TestUtils.scryRenderedDOMComponentsWithClass(component, ['visible','errorMessage']);
    /** CUSTOM FOR COMPONENT **/

    let component = null;


    beforeEach(function() {
        component = TestUtils.renderIntoDocument(<SignupForm handler={handler} />);
    });

    describe('render', () => {
        it('snapshot', () => {
            const wrapper = shallow(<SignupForm />);
            expect(wrapper).toMatchSnapshot();
        });
        it('has 3 fields and 1 button', () => {
            const fields = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
            expect(fields.length).toEqual(3);
            const buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
            expect(buttons.length).toEqual(1);
        });
    });
    describe('behavoir', () => {
        it('show error when form submit with empty values', () => {
            expect(getErrors().length).toEqual(0);
            const form = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
            TestUtils.Simulate.submit(form);
            expect(getErrors().length).toEqual(3);
            expect(component.state['error']).toBeTruthy();
        });
        it('call login handler when submit', () => {
            expect(handler).toHaveBeenCalledTimes(0);

            const inputs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
            TestUtils.Simulate.change(inputs[0], {target: {value: exampleUser.username}});
            TestUtils.Simulate.change(inputs[1], {target: {value: exampleUser.password}});
            TestUtils.Simulate.change(inputs[2], {target: {value: exampleUser.nickname}});
            expect(component.state['inputs'][0].value).toBe(exampleUser.username);
            expect(component.state['inputs'][1].value).toBe(exampleUser.password);
            expect(component.state['inputs'][2].value).toBe(exampleUser.nickname);

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