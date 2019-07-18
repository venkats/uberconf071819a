module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "mocha": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"      
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "eqeqeq": "error",
        "strict": "error",
        "no-var": "error",
        "prefer-const": "error",
        "no-console": "off",      
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single",
            "avoid-escape"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};