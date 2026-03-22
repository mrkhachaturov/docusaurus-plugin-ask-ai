import React from 'react';
import OriginalRoot from '@theme-original/Root';
import BrowserOnly from '@docusaurus/BrowserOnly';
import type { WrapperProps } from '@docusaurus/types';
import type RootType from '@theme/Root';

type Props = WrapperProps<typeof RootType>;

export default function RootWrapper(props: Props): React.ReactNode {
  return (
    <OriginalRoot {...props}>
      {props.children}
      <BrowserOnly>
        {() => {
          const { AskAiButton } = require('./AskAiButton');
          return <AskAiButton />;
        }}
      </BrowserOnly>
    </OriginalRoot>
  );
}
