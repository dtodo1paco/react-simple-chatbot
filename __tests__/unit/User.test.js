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
            const wrapper = shallow(<User user={exampleUser} loading={false}
                loginHandler={handler}
                signupHandler={handler}
                logoutHandler={handler}
            />);
            expect(wrapper).toMatchSnapshot();
        });
        it('when loading is true, loading icon is shown', () => {
            let content = getRenderedContent(<User user={null} loading={true}
                loginHandler={handler}
                signupHandler={handler}
                logoutHandler={handler}
            />)
            expect(content.props.className).toBe('loading-icon');
        });
        it('when loading is false and no user given, a tab menu is shown', () => {
            let content = getRenderedContent(<User user={null} loading={false}
                loginHandler={handler}
                signupHandler={handler}
                logoutHandler={handler}
            />);
            expect(content.key).toBe('tabs-menu');
        });
        it('when loading is false and a user given, a wellcome page is shown', () => {
            let content = getRenderedContent(<User user={exampleUser} loading={false}
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