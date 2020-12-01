import { Router } from 'express'
import Users from '../models/auth.js'
import {registerValidation, loginValidation} from '../validation.js'

let router = Router()

// VALIDATION


router.post('/register', async (req, res) => {

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

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

