import express from 'express'
import mongoose from 'mongoose'

// app configuration
const app = express()

const port = process.env.PORT || 3001

// middleware


// DB configuration


// API Endpoints
app.get('/',(req, res) => {
    res.status(200).send("Hello World")
})

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`))
