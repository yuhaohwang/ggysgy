module.exports = {
  tabWidth: 2, // 缩进4个字符
  printWidth: 140, // 行宽 default:80
  singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
  semi: true, // 行尾是否使用分号，默认为true
  trailingComma: 'es5', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  arrowParens: 'avoid', // x => x
  jsxBracketSameLine: true,
  requirePragma: false, //顶部注释
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: true,
  overrides: [{
    files: '*.md',
    options: {
      tabWidth: 2,
    },
  }]
}
