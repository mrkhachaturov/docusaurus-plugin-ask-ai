import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import OriginalRoot from '@theme-init/Root';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { AskAiThemeConfig } from '../../types';

export default function Root({children}: {children: React.ReactNode}): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const config = (siteConfig.themeConfig.askAi ?? {}) as AskAiThemeConfig;
  const position = config.position ?? 'fixed';

  return (
    <OriginalRoot>
      {children}
      {position === 'fixed' && (
        <BrowserOnly>
          {() => {
            const { AskAiButton } = require('./AskAiButton');
            return <AskAiButton />;
          }}
        </BrowserOnly>
      )}
    </OriginalRoot>
  );
}
