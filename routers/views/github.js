import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }))

export default router