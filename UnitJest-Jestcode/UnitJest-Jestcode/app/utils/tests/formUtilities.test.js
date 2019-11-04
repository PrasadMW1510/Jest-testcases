import * as FormUtilities from '../formUtilities';

describe('Normalizing zip codes', () => {
  it('should match on all digits', () => {
    expect(FormUtilities.normalizeZipCode('1234', '123')).toBe('1234');
  });
  it('should match on digits, spaces, and dashes', () => {
    expect(FormUtilities.normalizeZipCode('123 - ', '123 -')).toBe('123 - ');
  });
  it('should limit to 10 characters', () => {
    expect(FormUtilities.normalizeZipCode('12345678901', '1234567890')).toBe('1234567890');
  });
  it('should revert on any non-digit', () => {
    expect(FormUtilities.normalizeZipCode('123a', '123')).toBe('123');
  });
});
