import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/index.html'}), (req, res) => {
    req.session.user = req.user
    res.redirect('/private.html')
})

export default router