import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import React from 'react'
import serialize from 'serialize-javascript'

import fixingTheMustacheUrl from 'assets/fixing-the-mustache.png'

type StateKey = keyof State

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  alternateLocales?: string[]
  children: string
  description?: string
  links?: React.ReactElement[]
  scripts?: React.ReactElement[]
  state?: State
  styles?: React.ReactElement[]
  title?: string
}

interface State {
  __APOLLO_CACHE__: NormalizedCacheObject
  __APOLLO_STATE__: Record<string, any>
}

const Html: React.FunctionComponent<Props> = ({
  alternateLocales = [],
  children,
  description = 'Personal website of Andrew Torres',
  lang = 'en',
  links = [],
  scripts = [],
  state = { __APOLLO_CACHE__: {}, __APOLLO_STATE__: {} },
  styles,
  title = 'Andrew Torres',
  ...props
}: Props) => (
  <html lang={lang} {...props}>
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="author" content="Andrew Torres" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#000" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ajtorres333" />
      <meta name="twitter:creator" content="@ajtorres333" />
      <meta property="og:title" content="Andrew Torres" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={`https://andrewjtorr.es/${fixingTheMustacheUrl}`}
      />
      <meta property="og:image:alt" content="Fixing the mustache" />
      <meta property="og:url" content="https://andrewjtorr.es" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={lang} />
      {alternateLocales.map(locale => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      {links}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      {styles}
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this application.
      </noscript>
      <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
      {Object.keys(state).map(key => (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.${key}=${serialize(state[key as StateKey])};`,
          }}
          key={key}
        />
      ))}
      {scripts}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)},ga.l=+new Date,ga('create','UA-102781909-1','auto'),ga('send','pageview');",
        }}
      />
      <script async defer src="https://www.google-analytics.com/analytics.js" />
    </body>
  </html>
)

export default Html
