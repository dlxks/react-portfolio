import { describe, it, expect } from 'vitest';
import { getFullUrl, firstWord, capitalize } from '../../src/lib/utils';

describe('utils', () => {
  describe('getFullUrl', () => {
    it('should return empty string for falsy values', () => {
      expect(getFullUrl('')).toBe('');
      expect(getFullUrl(null)).toBe('');
      expect(getFullUrl(undefined)).toBe('');
    });

    it('should not modify urls that already have http/https protocol', () => {
      expect(getFullUrl('https://example.com')).toBe('https://example.com');
      expect(getFullUrl('http://example.com')).toBe('http://example.com');
    });

    it('should add https protocol to urls without it', () => {
      expect(getFullUrl('example.com')).toBe('https://example.com');
      expect(getFullUrl('www.example.com')).toBe('https://www.example.com');
    });
  });

  describe('firstWord', () => {
    it('should return the first word of a string', () => {
      expect(firstWord('John Doe')).toBe('John');
      expect(firstWord(' Hello World ')).toBe('Hello');
    });

    it('should return empty string for falsy values', () => {
      expect(firstWord('')).toBe('');
      expect(firstWord(undefined)).toBe('');
    });
  });

  describe('capitalize', () => {
    it('should capitalize the first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('should handle empty or undefined strings', () => {
      expect(capitalize('')).toBe('');
      expect(capitalize(undefined)).toBe('');
    });
  });
});
