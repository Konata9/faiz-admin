import * as Router from 'koa-router'
const router = new Router()

const { createUser } = require('../middleware/user')

router.get('/test', async (ctx, next) => {
  const userInfo = {
    username: 'Konata9',
    password: '123456',
    role: [String]
  }

  await createUser(userInfo)
  ctx.body = {
    code: 200,
    message: 'user created'
  }
})

export default router