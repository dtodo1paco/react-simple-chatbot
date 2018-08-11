import React from 'react';
import ReactDOM from 'react-dom';

import { isProd } from 'config/api-config.js';

import App from './App';
import * as UserAPI from 'api/user-api.js';
import * as ChatbotAPI from 'api/chatbot-api.js';

ReactDOM.render(
        <App userAPI={UserAPI} chatbotAPI={ChatbotAPI} />,
  document.getElementById('app')
);

if (!isProd) {
    module.hot.accept();
}
