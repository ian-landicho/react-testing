# React Testing

## Strategies

- Do not use `babel` if using `TypeScript`:

> there are some caveats to using TypeScript with Babel. Because TypeScript support in Babel is purely transpilation, Jest will not type-check your tests as they are run. If you want that, you can use ts-jest instead, or just run the TypeScript compiler tsc separately (or as part of your build process).

- Use `ts-jest`. See [how to configure ts-jest](https://jestjs.io/docs/getting-started#via-ts-jest)

- Mocking API calls with [`MSW`](https://mswjs.io/)
