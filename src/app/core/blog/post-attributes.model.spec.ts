import { categories, isCategory } from './post-attributes.model';

describe('isCategory', () => {
  it('accepts every declared category', () => {
    for (const category of categories) {
      expect(isCategory(category)).toBe(true);
    }
  });

  it('rejects a value outside the declared set', () => {
    // The typo that shipped in the first version of the frontmatter.
    expect(isCategory('tecnology')).toBe(false);
  });

  it('rejects non-string values without throwing', () => {
    expect(isCategory(undefined)).toBe(false);
    expect(isCategory(null)).toBe(false);
    expect(isCategory(42)).toBe(false);
  });

  it('does not match on prefix or casing', () => {
    expect(isCategory('tech')).toBe(false);
    expect(isCategory('Technology')).toBe(false);
  });
});