module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '@react-native-community',
    'standard',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    '@typescript-eslint/no-restricted-imports': [
      'warn',
      {
        name: 'react-redux',
        importNames: ['useSelector', 'useDispatch'],
        message:
          'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '~*/**/*',
            group: 'internal',
          },
          {
            pattern: '~*/**/*.*',
            group: 'internal',
          },
          {
            pattern: './*',
            group: 'unknown',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': 'error',
    'import/default': 0,
    'import/no-unresolved': 0,
    'react/no-unstable-nested-components': 0,
    'react-hooks/exhaustive-deps': 0,
  },
  settings: {
    'import/ignore': ['react-native'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      alias: {
        map: [
          ['~assets', './app/assets'],
          ['~components', './app/src/components'],
          ['~constants', './app/src/constants'],
          ['~containers', './app/src/containers'],
          ['~hoc', './app/src/hoc'],
          ['~hooks', './app/src/hooks'],
          ['~routes', './app/src/routes'],
          ['~state', './app/src/state'],
          ['~utils', './app/src/utils'],
          ['~views', './app/src/views'],
        ],
      },
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
      node: {
        project: 'tsconfig.json',
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
};
