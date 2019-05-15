module.exports = {
    // parser: "babel-eslint",
    parserOptions: {
        sourceType: 'module'
    },
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    parser: "vue-eslint-parser",
    globals: {
        AMap: false
    }
}