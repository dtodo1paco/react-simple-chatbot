jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { getRenderedContent, getComposite} from '../util/render.js';


const User = require('components/User').default;

describe('User testing...', () => {
    /** CUSTOM FOR COMPONENT **/
    const exampleUser = {
        username: "testun",
        password: "supersecret"
    };

    const handler = jest.fn();

    beforeEach(function() {

    });

    describe('render', () => {
        it('snapshot', () => {
            const wrapper = shallow(<User user={exampleUser}
                loginHandler={handler}
                signupHandler={handler}
                logoutHandler={handler}
            />);
            expect(wrapper).toMatchSnapshot();
        });
        it('when no user given, a tab menu is shown', () => {
            let content = getRenderedContent(<User user={null}
                loginHandler={handler}
                signupHandler={handler}
                logoutHandler={handler}
            />);
            expect(content.key).toBe('tabs-menu');
        });
        it('when a user is given, a wellcome page is shown', () => {
            let content = getRenderedContent(<User user={exampleUser}
                loginHandler={handler}
                signupHandler={handler}
                logoutHandler={handler}
            />);
            expect(content.key).toBe('wellcome-page');
        });
    });
});

/**
 console.log("Errors: " + renderedDOM().querySelectorAll('.visible').length);
**/
