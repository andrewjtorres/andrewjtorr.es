import { NormalizedCacheObject } from '@apollo/client/cache'
import { FunctionComponent, HtmlHTMLAttributes, ReactElement } from 'react'
import serialize from 'serialize-javascript'

import fixingTheMustacheUrl from 'assets/fixing-the-mustache.png'

type StateKey = keyof State

export interface HtmlProps extends HtmlHTMLAttributes<HTMLHtmlElement> {
  alternateLocales?: string[]
  children: string
  description?: string
  links?: ReactElement[]
  scripts?: ReactElement[]
  state?: State
  styles?: ReactElement[]
  title?: string
}

interface State {
  __APOLLO_CACHE__: NormalizedCacheObject
  __APOLLO_STATE__: Record<string, any>
}

export const Html: FunctionComponent<HtmlProps> = ({
  alternateLocales = [],
  children,
  description = 'Personal website of Andrew Torres',
  lang = 'en',
  links = [],
  scripts = [],
  state = { __APOLLO_CACHE__: {}, __APOLLO_STATE__: {} },
  styles,
  title = 'Andrew Torres',
  ...restProps
}: HtmlProps) => (
  <html lang={lang} {...restProps}>
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="author" content="Andrew Torres" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#fff" />
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
      {alternateLocales.map((locale) => (
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
      <link rel="mask-icon" href="/mask-icon.svg" color="#f15b5b" />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@import url('https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700&display=swap');",
        }}
      />
      {styles}
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this application.
      </noscript>
      <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
      {Object.keys(state).map((key) => (
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
