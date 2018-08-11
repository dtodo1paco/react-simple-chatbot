/*
import FileSystem from '../util/FileSystem.js';
const fileReader = new FileSystem();
const LOGIN_DATA = fileReader.parseJSONResponse('login');
const LOGIN_ERROR = fileReader.parseJSONResponse('login-error');
*/
import { generateResponseUserAuth, generateResponseUserRegister, generateResponseUserMe } from '../util/fakeGenerator.js';

export const doLogin = jest.fn(() => (generateResponseUserAuth(true)))
    .mockImplementationOnce(() => (generateResponseUserAuth(false)))

export const doRegister = jest
    .fn((user) => (generateResponseUserRegister(user, true)))
    .mockImplementationOnce((user) => (generateResponseUserRegister(user, false)))

export const doAuth = jest.fn((token) => (generateResponseUserMe(token)))
    .mockImplementationOnce((token) => (generateResponseUserMe(null)))
