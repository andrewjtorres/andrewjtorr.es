import React from 'react'

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  children: string
  description?: string
  links?: React.ReactElement[]
  scripts?: React.ReactElement[]
  styles: React.ReactElement[]
  title?: string
}

const Html: React.FunctionComponent<Props> = ({
  children,
  description = 'Personal website of Andrew Torres',
  links = [],
  scripts = [],
  styles,
  title = 'Andrew Torres',
  ...props
}: Props) => (
  <html lang="en" {...props}>
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="author" content="Andrew Torres" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#000" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="twitter:site:id" content="@ajtorres333" />
      <meta name="twitter:creator:id" content="@ajtorres333" />
      <meta property="og:title" content="Andrew Torres" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content="https://andrewjtorr.es" />
      <meta
        property="og:image:url"
        content="https://andrewjtorr.es/media/fixing-the-mustache.png"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:width" content="600" />
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
      <noscript>You need to enable JavaScript to run this application</noscript>
      <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
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
