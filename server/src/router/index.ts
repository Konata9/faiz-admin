import express, { Request, Response } from 'express'
import ERROR_CODE from '@constants/errorcode'
import { generateJWT } from '@utils'
import { loginSchema } from '@router/validator'
import { findUser } from '@controller/user'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  const { body: { username, password } } = req
  const { error } = loginSchema.validate({ username, password })
  if (error) {
    res.status(400).end()
  }

  const user = await findUser({ username, password })
  if (user) {
    const { _id: id, username } = user
    const token = generateJWT({ id, username })
    res.json({ token })
  } else {
    res.send({ code: ERROR_CODE.USER_NOT_EXIST })
  }
})

router.post('/signup', (req: Request, res: Response) => {

})

export default router