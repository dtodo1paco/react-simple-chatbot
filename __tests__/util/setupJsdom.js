/*
const jsdom = require('jsdom');
const jsdomConfig = {url: 'https://test.io'};
global.document = jsdom(undefined, jsdomConfig);
jsdom.changeURL(global.document, 'https://www.example.com');
 */


 import jsdom from 'jsdom';
 const {JSDOM} = jsdom;
 const {document} = (new JSDOM('<!doctype html><html><body></body></html>'), {cors:false}).window;
 global.document = document;
 global.window = document.defaultView;
console.log("JSDOM fixed")
