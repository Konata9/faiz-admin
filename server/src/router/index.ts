import express, { Request, Response } from 'express'
import ERROR_CODE from '@constants/errorcode'
import { generateJWT, decryptFrontendValue, encryptValue, encryptValeUseSHA } from '@utils'
import { validateLogin, validateSignup } from '@router/validator'
import { findUserByAccount, createUser } from '@src/controller/user'

const router = express.Router()

router.post('/login', [
  validateLogin,
  async (req: Request, res: Response) => {
    const { body: { username, password } } = req
    try {
      const rawPassword = decryptFrontendValue(password)
      const encryptedPassword = encryptValeUseSHA(encryptValue(rawPassword))
      const user = await findUserByAccount({ username, password: encryptedPassword })
      console.log('user: ', user)
      if (user) {
        const { _id: id, updateTime } = user
        const token = generateJWT({ id, username, updateTime })
        res.json({ id, token })
      } else {
        res.send({ code: ERROR_CODE.USER_NOT_EXIST }).end()
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
      const user = await findUserByAccount({ username })
      if (user) {
        res.send({ code: ERROR_CODE.USER_EXISTED }).end()
      } else {
        const newUser = await createUser({ username, password })
        const { _id: id } = newUser
        const token = generateJWT({ id, username })
        res.json({ userId: id, token }).end()
      }
    } catch (error) {
      // TODO with error
      res.send(error)
    }
  }
])

export default router