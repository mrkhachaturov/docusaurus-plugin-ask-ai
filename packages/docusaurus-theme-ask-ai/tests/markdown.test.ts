import { describe, it, expect } from 'vitest';
import { getMdPath, buildPrompt } from '../src/theme/Root/markdown';

describe('getMdPath', () => {
  it('appends index.md for trailing slash', () => {
    expect(getMdPath('/docs/guides/')).toBe('/docs/guides/index.md');
  });

  it('appends .md for no trailing slash', () => {
    expect(getMdPath('/docs/intro')).toBe('/docs/intro.md');
  });

  it('handles root path', () => {
    expect(getMdPath('/')).toBe('/index.md');
  });
});

describe('buildPrompt', () => {
  const prefix = 'Use the following {title} documentation to help me:\n\n';

  it('builds prompt with title replacement', () => {
    const result = buildPrompt('# Hello', 'My Page', prefix, 7500);
    expect(result).toContain('Use the following My Page documentation');
    expect(result).toContain('# Hello');
  });

  it('truncates long content with suffix', () => {
    const longContent = 'x'.repeat(8000);
    const result = buildPrompt(longContent, 'Title', prefix, 100);
    expect(result.length).toBeLessThan(8000);
    expect(result).toContain('[Truncated');
  });

  it('includes page URL in truncation suffix when provided', () => {
    const longContent = 'x'.repeat(8000);
    const result = buildPrompt(longContent, 'Title', prefix, 100, 'https://example.com/page.md');
    expect(result).toContain('https://example.com/page.md');
  });

  it('does not truncate short content', () => {
    const result = buildPrompt('short', 'Title', prefix, 7500);
    expect(result).not.toContain('[Truncated');
  });
});
