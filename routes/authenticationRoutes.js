import { Router } from 'express'
import Users from '../models/auth.js'
import {registerValidation, loginValidation} from '../validation.js'

let router = Router()

router.post('/register', async (req, res) => {
    // This validates the information provided by the user and makes sure it meets criteria
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // check this the user is already in DB
    const emailExists = await Users.findOne({
        email: req.body.email
    })
    if(emailExists) return res.status(400).send("Email Already Exists")

    // creates a new user
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

