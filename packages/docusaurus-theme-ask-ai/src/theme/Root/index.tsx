import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Root({children}: {children: React.ReactNode}): React.ReactNode {
  return (
    <>
      {children}
      <BrowserOnly>
        {() => {
          const { AskAiButton } = require('./AskAiButton');
          return <AskAiButton />;
        }}
      </BrowserOnly>
    </>
  );
}
