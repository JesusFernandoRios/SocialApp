import express from 'express'
import mongoose from 'mongoose'
import Cards from './models/dbCards.js'
import authRouter from './routes/authenticationRoutes.js'
import Cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from "http";
import { Server } from "socket.io";
import {auth} from './verifyToken.js'

// app configuration
const app = express()
const port = process.env.PORT || 3001
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin: "*",
        methods: ["GET",'POST'],
    }
}
);

// 
dotenv.config()

// middleware
app.use(express.json())
app.use(Cors())

// DB configuration
mongoose.connect(
    process.env.DB_CONNECT,
    {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    },
() => console.log('connected to DB')
);

// API Endpoints
app.get('/',(req, res) => {
    res.status(200).send("Server is On")
})

app.post('/social/card', auth, (req, res) => {
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

// AUTHENTICATION API
app.use('/api/user', authRouter)



// SocketIo Server Init
io.on("connection", (socket) => {
    socket.emit("your id", socket.id)
    socket.on("send message", body => {
        io.emit('message', body)
    })
});

// Listener
httpServer.listen(port, () => console.log(`Listening on localhost:${port}`))
