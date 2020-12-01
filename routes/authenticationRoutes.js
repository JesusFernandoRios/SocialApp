import { Router } from 'express'
import Users from '../models/auth.js'
import {registerValidation, loginValidation} from '../validation.js'
import bcrypt from 'bcryptjs'

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

    // Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // creates a new user
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })

    try{
        const savedUser = await user.save();
        res.send({user: user._id})
    }catch(err){
        res.status(400).send(err)
    }
})

// Login users
router.post('/login', async (req, res) => {

    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await Users.findOne({
        email: req.body.email
    })
    if(!user) return res.status(400).send("Email does not exist")

    // password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Password does not exist")

    res.send("logged In")
})

export default router;

