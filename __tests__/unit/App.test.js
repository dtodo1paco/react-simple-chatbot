jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import { getRenderedContent, getComposite} from '../util/render.js';
import { generateUserLogin, generateUserRegister, generateUserLoggedIn } from '../util/fakeGenerator';

import * as ChatbotAPI from 'api/chatbot-api.js';
import * as UserAPI from 'api/user-api.js';
import {
    doAuth as mock_doAuth,
    doLogin as mock_doLogin,
    doRegister as mock_doRegister
    } from '../__mocks__/user-api.js'
import {
    doSendMessage as mock_doSendMessage
    } from '../__mocks__/chatbot-api.js'

const App = require('App').default;

describe('App testing...', () => {

    let exampleUserLogin    = generateUserLogin();
    let exampleUserRegister = generateUserRegister();
    let exampleUserLoggedIn = generateUserLoggedIn();
    beforeEach(function() {
    });

    describe('render', () => {
        it('snapshot', () => {
            const wrapper = shallow(<App userAPI={UserAPI} chatbotAPI={ChatbotAPI} />);
            expect(wrapper).toMatchSnapshot();
        });
        it('mount renders login form by default', () => {
            const component = mount(<App userAPI={UserAPI} chatbotAPI={ChatbotAPI} />);
            const fields = component.find('.field');
            expect(fields.length).toEqual(2);
            const button = component.find('button').first();
            expect(button.text()).toEqual("Login");
        });
        it('mount renders chatbot widget closed if a user is logged in', () => {
            const component = mount(<App userAPI={UserAPI} chatbotAPI={ChatbotAPI} user={exampleUserLoggedIn} />);
            const widget = component.find('.rcw-widget-container');
            expect(widget.length).toEqual(1);
            const opened = component.find('.rcw-opened');
            expect(opened.length).toEqual(0);
        });
    });

    describe('behavoir', () => {
        describe('when loading', () => {
            it('when loading is true, loading icon is shown', () => {
                const wrapper = shallow(<App />);
                const instance = wrapper.instance();
                expect(wrapper.state('thinking')).toBeFalsy();
                expect(wrapper.find('.loading-icon')).toHaveLength(0);
                wrapper.setState({thinking: true});
                expect(wrapper.state('thinking')).toBeTruthy();
                expect(wrapper.find('.loading-icon').length).toEqual(1);
            });
        });
        describe('when login', () => {
            UserAPI.doLogin = mock_doLogin;
            it('when the user login fails, the user is NOT set in state', async () => {
                const wrapper = shallow(<App userAPI={UserAPI} chatbotAPI={ChatbotAPI} />);
                const instance = wrapper.instance();
                expect(wrapper.state('user')).toBe(null);
                let data = await instance.loginHandler(exampleUserLogin);
                wrapper.update();
                expect(wrapper.state('user')).toBeNull();
                expect(wrapper.state().errors).not.toBe(null);
            });
            it('when the user login succeeds, the user is set in state', async () => {
                const wrapper = shallow(<App userAPI={UserAPI} chatbotAPI={ChatbotAPI} />);
                const instance = wrapper.instance();
                expect(wrapper.state('user')).toBe(null);
                let data = await instance.loginHandler(exampleUserLogin);
                wrapper.update();
                expect(wrapper.state().user.username).toBe(exampleUserLogin.username);
                expect(wrapper.state().user.token).not.toBeNull();
                expect(wrapper.state().errors).toBe(null);
            });
        });
        describe('when signup', () => {
            UserAPI.doRegister = mock_doRegister;
            it('when the user register fails, the user is NOT set in state', async () => {
                const wrapper = shallow(<App userAPI={UserAPI} chatbotAPI={ChatbotAPI} />);
                const instance = wrapper.instance();
                expect(wrapper.state('user')).toBe(null);
                let data = await instance.signupHandler(exampleUserRegister);
                wrapper.update();
                expect(wrapper.state().user).toBe(null);
                expect(wrapper.state().errors).not.toBe(null);
            });
            it('when the user register succeeds, the user is set in state', async () => {
                const wrapper = shallow(<App userAPI={UserAPI} chatbotAPI={ChatbotAPI} />);
                const instance = wrapper.instance();
                expect(wrapper.state('user')).toBe(null);
                let data = await instance.signupHandler(exampleUserRegister);
                wrapper.update();
                expect(wrapper.state().user.username).toBe(exampleUserRegister.username);
                expect(wrapper.state().user.nickname).toBe(exampleUserRegister.nickname);
                expect(wrapper.state().user.token).not.toBeNull();
                expect(wrapper.state().errors).toBe(null);
            });
        });

    });
});


//wrapper.find('.rcw-new-message').simulate('input', {target: {value: message}});
//wrapper.find('.rcw-new-message').getElement().value = message;
//wrapper.find('.rcw-new-message').value = message;
//wrapper.find('.rcw-new-message').simulate('keydown', {keyCode: 13, target: {value:message}});
//                wrapper.find('.rcw-new-message').getDOMNode().value = message;
//                wrapper.find('.rcw-new-message').simulate('change');

//wrapper.find('.rcw-new-message').simulate('change',{target: {value: message}});
//let inputs = TestUtils.scryRenderedDOMComponentsWithTag(wrapper, '.rcw-new-message');
//TestUtils.Simulate.change(wrapper.find('.rcw-new-message'), {target: {value: message}});
//wrapper.find('.rcw-new-message').props().onChange({target: {value: message}});
