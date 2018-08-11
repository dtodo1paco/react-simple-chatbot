import { decrypt } from 'actions/crypt-util.js';
let backendHost;

export const isProd = ("production" === process.env.NODE_ENV);

if(isProd) {
    backendHost = decrypt("6ffee88d428160101092383f98ea540e8e0e65ca18863f6f7f6f99940acc70a96dc0ce048d2666ff1a8006a3b0c60d1a");
} else {
    backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:3000';
}

export const API_ROOT = `${backendHost}/api`;
export const getChatbotClient = (token) => {
    if (isProd) {
        const ApiAiClient = require('api-ai-javascript').ApiAiClient;
        return new ApiAiClient({accessToken: token});
    } else {
        const ApiAiClient = require('../../__tests__/__mocks__/ApiAiClient').default;
        return new ApiAiClient({accessToken: token});
    }
}