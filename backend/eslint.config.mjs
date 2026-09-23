import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';
import { importX } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export default [
  {
    files: ['{src,test}/**/*.{js,mjs,ts,jsx,tsx}'],
    ignores: ['src/**/*.test.{js,mjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      'curly': ['error', 'all'],
      'max-lines': 'error',
    },

    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver()],

      react: {
        version: 'detect',
      },
    },
  },

  pluginJs.configs.recommended,

  {
    plugins: {
      '@stylistic': stylistic,
    },

    rules: {
      '@stylistic/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      }],
      '@stylistic/curly-newline': ['error', {
        IfStatementConsequent: 'always',
        IfStatementAlternative: 'always',
        DoWhileStatement: 'always',
        ForInStatement: 'always',
        ForOfStatement: 'always',
        ForStatement: 'always',
        WhileStatement: 'always',
        SwitchStatement: 'always',
        SwitchCase: 'always',
        TryStatementBlock: 'always',
        TryStatementHandler: 'always',
        TryStatementFinalizer: 'always',
        BlockStatement: 'always',
        ArrowFunctionExpression: {
          minElements: 2,
          consistent: true,
        },
        FunctionDeclaration: 'always',
        FunctionExpression: 'always',
        Property: 'always',
        ClassBody: 'always',
        StaticBlock: 'always',
        WithStatement: 'always',
        TSModuleBlock: 'always',
      }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx-closing-bracket-location': 'error',
      '@stylistic/jsx-curly-brace-presence': ['error', 'never'],
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
      '@stylistic/jsx-max-props-per-line': ['error', {
        when: 'multiline',
      }],
      '@stylistic/jsx-tag-spacing': ['error', {
        beforeSelfClosing: 'always',
      }],
      '@stylistic/jsx-wrap-multilines': ['error', {
        prop: 'parens-new-line',
        return: 'parens-new-line',
      }],
      '@stylistic/keyword-spacing': ['error'],
      '@stylistic/max-len': ['error', {
        code: 120,
      }],
      '@stylistic/max-statements-per-line': ['error'],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      }],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', {
        max: 1,
        maxBOF: 0,
        maxEOF: 1,
      }],
      '@stylistic/no-trailing-spaces': ['error'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/padding-line-between-statements': ['error', {
        blankLine: 'never',
        prev: 'singleline-const',
        next: 'singleline-const',
      }, {
        blankLine: 'never',
        prev: 'singleline-let',
        next: 'singleline-const',
      }, {
        blankLine: 'never',
        prev: 'singleline-const',
        next: 'singleline-let',
      }, {
        blankLine: 'never',
        prev: 'singleline-let',
        next: 'singleline-let',
      }, {
        blankLine: 'always',
        prev: 'multiline-let',
        next: '*',
      }, {
        blankLine: 'always',
        prev: 'multiline-const',
        next: '*',
      }, {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-let',
      }, {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-const',
      }, {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      }, {
        blankLine: 'always',
        prev: '*',
        next: 'block',
      }, {
        blankLine: 'always',
        prev: 'block',
        next: '*',
      }, {
        blankLine: 'always',
        prev: '*',
        next: 'block-like',
      }, {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      }],
      '@stylistic/quotes': ['error', 'single', {
        avoidEscape: true,
      }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],
    },
  },

  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowHigherOrderFunctions: true,
          allowTypedFunctionExpressions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
      '@typescript-eslint/no-extraneous-class': 0,
      '@typescript-eslint/no-unsafe-enum-comparison': 0,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: 'all',
          destructuredArrayIgnorePattern: 'all',
          varsIgnorePattern: 'all',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
    },
  },

  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    rules: {
      'import-x/newline-after-import': 'error',
      'import-x/order': ['error', {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['builtin', 'external', 'sibling', 'parent', 'object', 'internal', 'index'],
        pathGroups: [{
          pattern: '@src/**',
          group: 'internal',
          position: 'after',
        }, {
          pattern: '@common{,/**}',
          group: 'internal',
          position: 'after',
        }],
        'newlines-between': 'always',
      }],
      'import-x/namespace': 0,
    },
  },
];
