import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch'; // Polyfill "window.fetch" for testing.

import { server } from './src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
