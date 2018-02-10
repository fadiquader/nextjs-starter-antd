import Document, { Head, Main, NextScript } from 'next/document'
import flush from "styled-jsx/server";

export default class DefaultDocument extends Document {
  static async getInitialProps (context) {
    // return await Document.getInitialProps(ctx)
    const props = await super.getInitialProps(context);
    const { html, head, errorHtml, chunks } = context.renderPage();
    const {req: {locale, localeDataScript}} = context;
    const styles = flush();
    return {
      ...props,
      locale: locale,
      localeDataScript,
      html, head,
      errorHtml,
      chunks, styles
    }

  }

  render() {
    /**
    * Here we use _document.js to add a "lang" propery to the HTML object if
    * one is set on the page.
    **/
    const lang = this.props.__NEXT_DATA__.props.locale || 'en'
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${lang}`
      return (
      <html lang={lang}>
        <Head>
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <script src={polyfill} />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}