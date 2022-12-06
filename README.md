# React Testing

## Guiding Principle

> **[The more your tests resemble the way your software is used, the more confidence they can give you.](https://testing-library.com/docs/)**

## Best Practices

- Do not use `babel` if using `TypeScript`:

> there are some caveats to using TypeScript with Babel. Because TypeScript support in Babel is purely transpilation, Jest will not type-check your tests as they are run. If you want that, you can use ts-jest instead, or just run the TypeScript compiler tsc separately (or as part of your build process).

- Use `ts-jest`. See [how to configure ts-jest](https://jestjs.io/docs/getting-started#via-ts-jest)

- Avoid common mistakes with `eslint-plugin-jest` and `@typescript-eslint/eslint-plugin`

  ```js
    // eslintrc.json
    "extends": [
      ...,
      "plugin:jest/recommended",
      "plugin:@typescript-eslint/recommended"
    ],

  ```

- Testing `React` components with [React Testing Library](https://github.com/testing-library/react-testing-library)

  - Use `within` to avoid querying the entire document
  - Waiting for [appearance and disapperance of an element](https://testing-library.com/docs/guide-disappearance)
  - Avoid `data-testid` if possible
    > it is recommended to use this only after the other queries don't work for your use case. Using data-testid attributes do not resemble how your software is used and should be avoided if possible.

- Mocking API calls with [`MSW`](https://mswjs.io/)

  - Testing network errors by [overriding](https://mswjs.io/docs/api/setup-server/use#one-time-override) `msw` endpoint

- 100% Code coverage 🔥🔥🔥

  We know that 100% code coverage does not mean we're writing meaningful tests throughout; at least, it will give us immediate feedback that we are missing some tests.

  ```js
    // jest.config.js
    coverageThreshold: {
      global: {
        statements: 100,
        branches: 100,
        lines: 100,
        functions: 100,
      },
    },
  ```
