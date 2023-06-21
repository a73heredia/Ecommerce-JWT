import { Router } from 'express'

const router = Router()

router.get('/reset', (req, res) => {
    res.render('reset-password', {})
})

export default router