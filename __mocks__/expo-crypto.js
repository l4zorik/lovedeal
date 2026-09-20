export const randomUUID = jest.fn(() => '550e8400-e29b-41d4-a716-446655440000');
export const digestStringAsync = jest.fn(() => Promise.resolve('mockedhash'));
export const CryptoDigestAlgorithm = {
  SHA256: 'SHA-256',
  SHA384: 'SHA-384',
  SHA512: 'SHA-512',
};
