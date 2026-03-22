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
  /** 'fixed' = floating bottom-right, 'breadcrumb' = static top-right of content area */
  position?: 'fixed' | 'breadcrumb';
  showCopyMarkdown?: boolean;
  showViewMarkdown?: boolean;
  showLlmsTxt?: boolean;
  promptPrefix?: string;
  maxPromptLength?: number;
  providers?: AskAiProvider[];
  /** When set, adds "Install {name} skill" menu item that copies command to clipboard */
  skill?: {
    command: string;
    name: string;
  };
}
