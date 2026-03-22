import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// NOTE: We intentionally do NOT import @theme-original/Root here.
// When this theme is installed via npm link (symlinked), the webpack
// alias for @theme-original/Root resolves back to this file, causing
// infinite recursion (Maximum call stack size exceeded during SSR).
// The default Docusaurus Root is just <>{children}</>, so skipping
// the wrap has no functional impact. If a consumer site has its own
// Root wrapper (via swizzle), they should wrap ours, not the other
// way around. Once published to npm (not symlinked), @theme-original
// resolution works correctly and this can be revisited.

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
