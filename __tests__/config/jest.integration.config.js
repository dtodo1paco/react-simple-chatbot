const path = require ('path');

module.exports = {
    verbose: true,
    bail: true,
    testEnvironment: "jsdom",
    testURL: 'http://localhost:9999',
    "collectCoverageFrom" : [
        "src/**/*.{js,jsx}",
        "!<rootDir>/node_modules/"
    ],
    "coverageThreshold": {
        "global": {
            "branches": 90,
            "functions": 90,
            "lines": 90,
            "statements": 90
        }
    },
    "coverageReporters": ["text"],
    moduleFileExtensions: [
        "js",
        "jsx"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            path.resolve(__dirname, '../../__tests__/__mocks__/fileMock.js'),
        "\\.(css|scss)$": path.resolve(__dirname, '../../__tests__/__mocks__/styleMock.js')
    },
    modulePaths: [path.resolve(__dirname, '../../src')],
    transform: {
        //'^.+\\.jsx?$': '<rootDir>/jest.transform.js',
        "^.+\\.jsx?$": "babel-jest"
        //"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/jest/jestpreprocessor.js"
    },
    setupTestFrameworkScriptFile: "../util/setup.js",
    snapshotSerializers: ["enzyme-to-json/serializer"],

    setupFiles: [

    ],
    roots: [path.resolve(__dirname, '../../__tests__/integration')]
}