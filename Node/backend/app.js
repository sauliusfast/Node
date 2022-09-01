const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { offerSchema } = require('./schemas/offerSchema')
const session = require('express-session')
const http = require('http').createServer(app)
const router = require('./router/mainRouter')
const socketIO = require('socket.io')
const io = socketIO (http, {cors: {origin: 'http://localhost:3000'}})
http.listen(4000)
console.log('server started on port 4000')
app.set('socketio', io)

mongoose.connect('mongodb+srv://node_atsiskaitymas:rdoI5l4VwfKTebsx@cluster0.bfhuq.mongodb.net/?retryWrites=true&w=majority')
    .then(res => {
        console.log('DB -> ok')
    })
    .catch(e  => console.log(e));
app.use(cors({
    origin: true,
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE"
}))
app.use(express.json())
app.use(session({
    secret: '<Z@f|o:)8ytcRNU_,rEe!NJIa5DEW3d%m|LVe?cpIxz@6TuY0V%,?-=nge7o3Jv',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}

}))
app.use('/', router)
let users = []
io.on('connect', socket => {
    socket.on('requestStatus', async data => {
        if (!users.find(x=>x.userID===data._id)) {
            users.push({socketID: socket.id, userID:data._id})
        }
        let requests = await offerSchema.find({madeToID:data._id}) 
        socket.emit('requestStatus', requests.length)
    })
    socket.on('alert', data => {
        let user = users.find(x=>x.userID===data.id)
        if (user) io.to(user.socketID).emit('alert', data.message)
    })
    socket.on('submitOffer', async data => {
        let user = users.find(x=>x.userID===data.madeToID)
        if (user) {
            let requests = await offerSchema.find({madeToID:data.madeToID}) 
            io.to(user.socketID).emit('requestStatus', requests.length)
            io.to(user.socketID).emit('alert', `${data.madeByName} made you an offer.`)
        }
    })
    socket.on('acceptOffer', offer => {
        let user = users.find(x=>x.userID===offer.madeByID)
        console.log(user)
        if (user) {
            io.to(user.socketID).emit('alert', `${offer.madeToName} has accepted your offer.`)
        }
    })
    socket.on('disconnect', ()=>{
        users = users.filter(x=>x.socketID!==socket.id)
    })
})