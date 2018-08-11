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

describe('Integration tests...', () => {

    let exampleUserLogin    = generateUserLogin();
    let exampleUserRegister = generateUserRegister();
    let exampleUserLoggedIn = generateUserLoggedIn();

    describe('Login feature', () => {
        UserAPI.doLogin = mock_doLogin;
        beforeEach(async (done) => {
            const wrapper = shallow(<App userAPI={UserAPI} chatbotAPI={ChatbotAPI} />);
            const instance = wrapper.instance();
            expect(wrapper.state('user')).toBe(null);
            let data = await instance.loginHandler(exampleUserLogin);
            done()
        });
        describe('when doing login', () => {
            it('the userAPI is used to do login with user [' + exampleUserLogin.username + ']', () => {
                expect(mock_doLogin).toHaveBeenCalledWith(exampleUserLogin);
            });
        });
    });
    describe('Signup feature', () => {
        UserAPI.doRegister= mock_doRegister;
        beforeEach(async (done) => {
            const wrapper = shallow(<App userAPI={UserAPI} chatbotAPI={ChatbotAPI} />);
            const instance = wrapper.instance();
            expect(wrapper.state('user')).toBe(null);
            let data = await instance.signupHandler(exampleUserRegister);
            done()
        });
        describe('when signing up', () => {
            it('the userAPI is used to signup user [' + exampleUserRegister.username + ']', () => {
                expect(mock_doRegister).toHaveBeenCalledWith(exampleUserRegister);
            });
        });
    });
    describe('Chatbot feature', () => {
        let message = "Hi! how are you doing?";
        UserAPI.doAuth = mock_doAuth;
        ChatbotAPI.doSendMessage = mock_doSendMessage;
        let wrapper = null;
        beforeEach(async (done) => {
            wrapper = shallow(<App userAPI={UserAPI} chatbotAPI={ChatbotAPI} user={exampleUserLoggedIn} />);
            const instance = wrapper.instance();
            let data = await instance.handleNewUserMessage(message);
            done();
        });
        it('when user auth fails, the message is not sent', () => {
            expect(mock_doAuth).toHaveBeenCalledWith(exampleUserLoggedIn.token);
            expect(mock_doSendMessage).not.toHaveBeenCalled();
        });
        it('when user auth succeeds, the message is sent vía chatbotAPI', () => {
            expect(mock_doAuth).toHaveBeenCalledWith(exampleUserLoggedIn.token);
            expect(mock_doSendMessage).toHaveBeenCalledWith(message, expect.any(String));
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
