export default {
  arrowParens: 'always',
  jsonRecursiveSort: true,
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      options: {
        parser: 'yaml',
        singleQuote: false,
        quoteProps: 'as-needed',
      },
    },
  ],
  plugins: [
    import.meta.resolve('prettier-plugin-sort-json'),
    import.meta.resolve('prettier-plugin-packagejson'),
  ],
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
};
