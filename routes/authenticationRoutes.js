import { Router } from 'express'
import Users from '../models/auth.js'

let router = Router()

router.post('/register', async (req, res) => {
    res.send("registered")
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/login')

export default router;

