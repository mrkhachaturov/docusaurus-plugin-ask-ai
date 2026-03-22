import React from 'react';
import OriginalDocBreadcrumbs from '@theme-init/DocBreadcrumbs';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { AskAiThemeConfig } from '../../types';

export default function DocBreadcrumbsWrapper(props: any): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const config = (siteConfig.themeConfig.askAi ?? {}) as AskAiThemeConfig;
  const position = config.position ?? 'fixed';

  if (position !== 'breadcrumb') {
    return <OriginalDocBreadcrumbs {...props} />;
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{flex: 1, minWidth: 0}}>
        <OriginalDocBreadcrumbs {...props} />
      </div>
      <BrowserOnly>
        {() => {
          const { AskAiButton } = require('../Root/AskAiButton');
          return <AskAiButton />;
        }}
      </BrowserOnly>
    </div>
  );
}
