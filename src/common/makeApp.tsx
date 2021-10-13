/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/react';
import { Root, Routes } from 'react-static';
import { Router } from '@reach/router';
import { Helmet } from 'react-helmet';
import globalStyle, { Spinner } from './GlobalStyle';
import { TopBar, TopBarLink, TopBarInternalLinkSelected } from './top-bar';


export default function makeApp(opts: AppOptions): React.VoidFunctionComponent<Record<never, never>> {
  return function App() {
    return (
      <Root>
        {globalStyle}

        <Helmet>
          <title>{opts.title}</title>
          <meta charSet="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>

        <TopBar
          role={opts.topBarIsHeader ? 'heading' : undefined}
          aria-level={opts.topBarIsHeader ? 1 : undefined}>
          {opts.topLinks.map(topLink => topLink.external
            ? <TopBarLink
              href={topLink.target}
              role={topLink.isHeader && !opts.topBarIsHeader ? 'heading' : undefined}
              aria-level={topLink.isHeader && !opts.topBarIsHeader ? 1 : undefined}
              title={topLink.title}>
              {topLink.text}
            </TopBarLink>
            : <TopBarInternalLinkSelected
              to={topLink.target}
              role={topLink.isHeader && !opts.topBarIsHeader ? 'heading' : undefined}
              aria-level={topLink.isHeader && !opts.topBarIsHeader ? 1 : undefined}
              title={topLink.title}>
              {topLink.text}
            </TopBarInternalLinkSelected>
          )}
        </TopBar>

        <React.Suspense fallback={<Spinner />}>
          <Router>
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </Root>
    );
  };
}


export interface AppOptions {
  title: string;
  topBarIsHeader?: true;
  topLinks: {
    target: string;
    text: JSX.Element | string;
    title?: string;
    external?: true;

    isHeader?: true;
  }[];
}
