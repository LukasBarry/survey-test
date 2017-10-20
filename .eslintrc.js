module.exports = {
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "es6": true
    },
};
