import Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'
import ERROR_CODE from '@constants/errorcode'

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { body: { username, password } } = req
  const { error } = loginSchema.validate({ username, password })
  if (error) {
    res.status(ERROR_CODE[400]).end()
  }

  next()
}

const signupSchema = loginSchema

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  const { body: { username, password } } = req
  const { error } = signupSchema.validate({ username, password })
  if (error) {
    res.status(ERROR_CODE[400]).end()
  }

  next()
}