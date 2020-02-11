import express, { Request, Response } from 'express'
import ERROR_CODE from '@constants/errorcode'
import { generateJWT } from '@utils'
import { validateLogin, validateSignup } from '@router/validator'
import { findUser, createUser } from '@controller/user'

const router = express.Router()

router.post('/login', [
  validateLogin,
  async (req: Request, res: Response) => {
    const { body: { username, password } } = req
    try {
      const user = await findUser({ username, password })
      if (user) {
        const { _id: id } = user
        const token = generateJWT({ id, username })
        res.json({ token })
      } else {
        res.send({ code: ERROR_CODE.USER_NOT_EXIST })
      }
    } catch (error) {
      // TODO with error
      res.send(error)
    }
  }
])

router.post('/signup', [
  validateSignup,
  async (req: Request, res: Response) => {
    const { body: { username, password } } = req
    try {
      // TODO with the password
      const user = await createUser({ username, password: '233' })
      const { _id: id } = user
      const token = generateJWT({ id, username })
      res.json({ token })
    } catch (error) {
      // TODO with error
      res.send(error)
    }
  }
])

export default router