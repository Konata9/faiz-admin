const Router = require('koa-router')
const router = new Router()

const { createUser } = require('../middleware/user')

router.get('/test', async (ctx, next) => {

  const userInfo = {
    username: 'Konata9',
    password: '123456',
    role: []
  }

  await createUser(userInfo)
  ctx.body = {
    code: 200,
    message: 'user created'
  }
})

module.exports = router