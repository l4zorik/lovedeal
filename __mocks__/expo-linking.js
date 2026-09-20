export const openURL = jest.fn(() => Promise.resolve());
export const canOpenURL = jest.fn(() => Promise.resolve(true));
export const makeURL = jest.fn((path) => `lovedeal://${path}`);
export const useURL = jest.fn(() => 'lovedeal://');
export const addEventListener = jest.fn(() => ({
  remove: jest.fn(),
}));
