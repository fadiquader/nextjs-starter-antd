import Link from 'next/link'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { atomDark as SyntaxHighlighterTheme } from 'react-syntax-highlighter/styles/prism'
import { Button } from 'antd'
import Page from '../../components/page'
import Layout from '../../components/Layout'
import NProgress from '../../components/NProgress'

export default class extends Page {
  
  static async getInitialProps({req, query}) {
    let props = await super.getInitialProps({req})
    props.slug = query.id
    return props
  }
  
  render() {
    return (
      <Layout {...this.props}>
        <NProgress />
        <div className="container">
          <h1 className="display-2">Routing</h1>
          <p className="lead">
            Next.js handles routing automatically and is easy to extend.
          </p>
          <p>
            By default a request for <span className="font-weight-bold">/about</span> is automatically handled by the page
            at <a href="https://github.com/iaincollins/nextjs-starter/blob/master/pages/about.js">pages/about.js</a>.
          </p>
          <p>
            This project uses Next.js together with Express to extend and override
            the default behaviour and add custom routes.
          </p>
          <h2>Example</h2>
          <p>
            The default route for this page is <Link href="/examples/routing"><a>/examples/routing</a></Link>.
          </p>
          <p>
            These routes also load this page, but have different URLs:
          </p>
          <ul>
            <li><Link href="/examples/routing?id=example-one" as="/custom-route/example-one"><a>/custom-route/example-one</a></Link></li>
            <li><Link href="/examples/routing?id=example-two" as="/custom-route/example-two"><a>/custom-route/example-two</a></Link></li>
          </ul>
          <p>
            Path: <span className="font-weight-bold">{this.props.url.asPath}</span>
          </p>
          <p>
            Slug: { (this.props.slug) ? <span className="font-weight-bold">{this.props.slug}</span> : <span className="text-muted">N/A</span> }
          </p>
          <p>
            You can access the current path using <span className="font-weight-bold">this.props.url.asPath</span>,
            and you can read the current slug in <span className="font-weight-bold">query</span> in <span className="font-weight-bold">getInitialProps()</span>.
          </p>
          <p>
            This behaviour can be combined with the <Link href="/examples/async"><a>Async</a></Link> example to load different content on a page based on the current route.
          </p>
          <h2>Configuring Routes</h2>
          <p>
            We have a rule in <a href="https://github.com/iaincollins/nextjs-starter/blob/master/index.js">index.js</a> that
            tells Express that any requests for <span className="font-weight-bold">/custom-route/{'{'}anything{'}'}</span> should
            be handled by the template <a href="https://github.com/iaincollins/nextjs-starter/blob/master/pages/examples/routing.js">pages/examples/routing.js</a>, which is this page.
          </p>
          <SyntaxHighlighter style={SyntaxHighlighterTheme} language="javascript">
            {`express.get('/custom-route/:slug', (req, res) => {
  return app.render(req, res, '/examples/routing', req.params)
})`}</SyntaxHighlighter>
          <p>
            The last route we configure in Express is a fallback that says all
            other routes should be handled by Next.js if no overriding routing
            behaviour is defined:
          </p>
          <SyntaxHighlighter style={SyntaxHighlighterTheme} language="javascript">
            {`express.all('*', (req, res) => {
  let nextRequestHandler = app.getRequestHandler()
  return nextRequestHandler(req, res)
})`}</SyntaxHighlighter>
          <p>
            Take a look at the source of <a href="https://github.com/iaincollins/nextjs-starter/blob/master/pages/examples/routing.js">this page</a> and <a href="https://github.com/iaincollins/nextjs-starter/blob/master/index.js">index.js</a> to see how
            to use &lt;Link&gt; with custom routes.
          </p>
          <h2>Other Approaches</h2>
          <p>
            If you just want to use custom routes without the other features offered by a framework like Express, there are a
            number of simpler routing options such as <a href="https://www.npmjs.com/package/next-routes">next-routes</a> designed specifically for use with Next.js.
          </p>
          <p>
            You can use modules like next-routes in conjuction with express, although configuring routes in more than one way
            can make a project difficult to maintain.
          </p>
          <h2>Custom error pages</h2>
          <p>
            If you want to see how custom 404, 500 and other HTTP errors are handled take a look at <a href="https://github.com/iaincollins/nextjs-starter/blob/master/pages/_error.js">pages/_error.js</a>.
          </p>
        </div>
      </Layout>
    )
  }

}