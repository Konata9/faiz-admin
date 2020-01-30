import * as webpack from 'webpack'
import * as Koa from 'koa'
import * as webpackDevMiddleware from 'webpack-dev-middleware'

const devMiddleware = (compiler: webpack.ICompiler, opts: webpackDevMiddleware.Options) => {
  const middleware = webpackDevMiddleware(compiler, opts)
  return async (ctx: Koa.Context, next: Koa.Next) => {
    await middleware(ctx.req, {
      //@ts-ignore
      end: (content: string) => {
        ctx.body = content;
      },
      setHeader: (name, value: any) => {
        ctx.set(name, value)
      }
    }, next)
  }
}

export default devMiddleware