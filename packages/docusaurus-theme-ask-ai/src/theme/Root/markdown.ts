/**
 * Compute the .md URL for the current page pathname.
 */
export function getMdPath(pathname: string): string {
  if (pathname.endsWith('/')) return pathname + 'index.md';
  return pathname + '.md';
}

/**
 * Build a prompt string from markdown content and page title.
 * Truncates if content exceeds maxLength.
 */
export function buildPrompt(
  markdown: string,
  title: string,
  promptPrefix: string,
  maxLength: number,
  pageUrl?: string,
): string {
  const prefix = promptPrefix.replace('{title}', title);
  const available = maxLength - prefix.length;
  if (markdown.length > available) {
    const truncated = markdown.substring(0, available);
    const suffix = pageUrl
      ? `\n\n[Truncated — full page: ${pageUrl}]`
      : '\n\n[Truncated]';
    return prefix + truncated + suffix;
  }
  return prefix + markdown;
}

/**
 * Fetch markdown content from the .md URL.
 * Returns null on failure (404, network error).
 */
export async function fetchMarkdown(mdPath: string): Promise<string | null> {
  try {
    const res = await fetch(mdPath);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}
