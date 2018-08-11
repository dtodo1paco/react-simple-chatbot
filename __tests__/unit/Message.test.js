jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import { generateMessage, generateMessageArray, generateWord } from '../util/fakeGenerator';
import { getRenderedContent, getComposite} from '../util/render.js';

const Message = require('components/Message').default;

describe('Messages testing...', () => {
    /** CUSTOM FOR COMPONENT **/
    const exampleSummary = generateMessage();
    const exampleErrors = generateMessageArray(generateWord().length);

    beforeEach(function() {
    });

    describe('render', () => {
        it('snapshot', () => {
            const wrapper = shallow(<Message
                success={false}
                summary="Snapshot summary"
                messages={["one message", "another message", "the third one"]} autohide={true} />
            );
            expect(wrapper).toMatchSnapshot();
        });
        it('when no success, message-error className is present', () => {
            let content = getRenderedContent(<Message
                success={false}
                summary={exampleSummary}
                messages={exampleErrors} autohide={true} />
            );
            expect(content.props.className).toBe('message-error');
        });
        it('when success, message-success className is present', () => {
            let content = getRenderedContent(<Message
                    success={true}
                    summary={exampleSummary}
                    messages={exampleErrors} autohide={true} />
            );
            expect(content.props.className).toBe('message-success');
        });

        it('message has the correct structure', () => {
            let content = getRenderedContent(<Message
                    success={false}
                    summary={exampleSummary}
                    messages={exampleErrors} autohide={true} />
            );
            expect(Array.isArray(content.props.children)).toBeTruthy();
            let summary = content.props.children[0];
            let messages = content.props.children[1];
            expect(typeof summary).toBe('string')
            expect(Array.isArray(messages)).toBeTruthy();
        });
        it('message has the correct summary [' + exampleSummary + "]", () => {
            let content = getRenderedContent(<Message
                    success={false}
                    summary={exampleSummary}
                    messages={exampleErrors} autohide={true} />
            );
            let summary = content.props.children[0];
            expect(summary).toBe(exampleSummary);
        });
        it('message has the correct ' + exampleErrors.length + " messages", () => {
            let content = getRenderedContent(<Message
                    success={false}
                    summary={exampleSummary}
                    messages={exampleErrors} autohide={true} />
            );
            let messages = content.props.children[1];
            expect(messages.length).toBe(exampleErrors.length);
            for (let i = 0; i < messages.length; i++) {
                expect(new String(messages[i])).toEqual(new String(<li>{exampleErrors[i]}</li>));
            }
        });
    });
});

/**
 console.log("Errors: " + renderedDOM().querySelectorAll('.visible').length);
**/