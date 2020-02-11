import express, { Request, Response } from 'express'
import { generateJWT } from '@utils'
import { findUser } from '@controller/user'

const router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
  const { body: { username, password } } = req
  const user = await findUser({ username, password })
  if (user) {
    const { _id: id, username } = user
    const token = generateJWT({ id, username })
    res.send({ token })
  } else {
    res.send({ code: 233 })
  }
})

router.post('/signup', (req: Request, res: Response) => {

})

export default router