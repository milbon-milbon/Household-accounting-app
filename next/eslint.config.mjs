export default [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      env: {
        browser: true,
        node: true,
        es2021: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: [
        'react',
        '@typescript-eslint',
      ],
      rules: {
        // 追加のルールをここに記載
      },
    },
  ];
  