module.exports = {
    "roots": [
        "src"
    ],
    "transform": {
        "^.+\\.ts$": "ts-jest"
    },
    "setupFiles": [
        "jest-webextension-mock",
        "<rootDir>/jest.setup.js"
    ]
}; 
