import { Router } from 'express'
import Users from '../models/auth.js'
import {registerValidation, loginValidation} from '../validation.js'
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'

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
        res.send({user: user.name, email:user.email})
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

    // creating and assigning token
    const token = Jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({token: token, user: user.name, email: user.email})

    console.log('recieved!!')
})

router.get('/register', (req, res) => {
    Users.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

export default router;

