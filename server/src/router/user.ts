import * as Router from 'koa-router'

const router = new Router()

router.get('/test', async (ctx, next) => {
  ctx.body = {
    code: 200,
    message: 'here is test'
  }
})

export default router