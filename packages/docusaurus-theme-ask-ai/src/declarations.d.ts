declare module '@theme-init/Root' {
  import type {ReactNode} from 'react';

  export default function Root(props: {children: ReactNode}): ReactNode;
}

declare module '@theme-init/DocBreadcrumbs' {
  import type {ReactNode} from 'react';

  export default function DocBreadcrumbs(props: any): ReactNode;
}

declare module '@docusaurus/BrowserOnly' {
  import type {ReactNode} from 'react';

  export default function BrowserOnly(props: {
    children: () => ReactNode;
    fallback?: ReactNode;
  }): ReactNode;
}

declare module '@docusaurus/useDocusaurusContext' {
  interface AskAiThemeConfigLike {
    askAi?: unknown;
  }

  interface SiteConfigLike {
    baseUrl: string;
    themeConfig: AskAiThemeConfigLike;
  }

  export default function useDocusaurusContext(): {
    siteConfig: SiteConfigLike;
  };
}

declare module '@docusaurus/router' {
  export function useLocation(): {
    pathname: string;
  };
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
