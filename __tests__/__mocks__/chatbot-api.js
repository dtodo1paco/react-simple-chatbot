import { generateResponseMessage } from '../util/fakeGenerator.js';

export const doSendMessage = jest
    .fn((message, token) => (generateResponseMessage(message, 5)))
//    .mockImplementationOnce((message, token) => (generateResponseMessage(message, 0)))

