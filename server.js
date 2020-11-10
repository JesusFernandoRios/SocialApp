import express from 'express'
import mongoose from 'mongoose'
import Cards from './models/dbCards.js'
import Cors from 'cors'

// app configuration
const app = express()
const port = process.env.PORT || 3001
const connection_url = 'mongodb+srv://Admin:3ngLrhWieXCeqSWL@cluster0.ebinh.mongodb.net/social-app?retryWrites=true&w=majority'

// middleware
app.use(express.json())
app.use(Cors())

// DB configuration
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// API Endpoints
app.get('/',(req, res) => {
    res.status(200).send("Hello World")
})

app.post('/social/card', (req, res) => {
    const dbCard = req.body

    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/social/card', (req, res) => {
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`))
