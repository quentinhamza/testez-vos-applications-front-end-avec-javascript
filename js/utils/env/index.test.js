import { isInTestEnv } from './index';

// Avant chaque test, nous réinitialisons la variable d'environnement NODE_ENV
beforeEach(() => {
  delete process.env.NODE_ENV;
});

test('should return true if NODE_ENV is set to "test"', () => {
  process.env.NODE_ENV = 'test';
  expect(isInTestEnv()).toBe(true);
});

test('should return false if NODE_ENV is not set to "test"', () => {
  process.env.NODE_ENV = 'development';
  expect(isInTestEnv()).toBe(false);

  process.env.NODE_ENV = 'production';
  expect(isInTestEnv()).toBe(false);

  delete process.env.NODE_ENV;
  expect(isInTestEnv()).toBe(false);
});
