export interface AskAiProvider {
  name: string;
  /** URL template — {prompt} is replaced with encoded prompt */
  url: string;
  /** Built-in key ('chatgpt'|'claude') or path/URL to icon */
  icon: string;
  /** Subtitle text, defaults to "Chat about this page with {name}" */
  description?: string;
}

export interface AskAiThemeConfig {
  buttonText?: string;
  showCopyMarkdown?: boolean;
  showViewMarkdown?: boolean;
  showLlmsTxt?: boolean;
  promptPrefix?: string;
  maxPromptLength?: number;
  providers?: AskAiProvider[];
}
