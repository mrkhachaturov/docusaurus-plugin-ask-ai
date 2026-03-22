import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import OriginalRoot from '@theme-init/Root';

export default function Root({children}: {children: React.ReactNode}): React.ReactNode {
  return (
    <OriginalRoot>
      {children}
      <BrowserOnly>
        {() => {
          const { AskAiButton } = require('./AskAiButton');
          return <AskAiButton />;
        }}
      </BrowserOnly>
    </OriginalRoot>
  );
}
