export const addScreenshotListener = jest.fn(() => ({
  remove: jest.fn(),
}));
export const removeScreenshotListener = jest.fn();
export const useScreenCapture = jest.fn(() => false);
