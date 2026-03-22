import React from 'react';
import OriginalRoot from '@theme-original/Root';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function RootWrapper({children}: {children: React.ReactNode}): React.ReactNode {
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
