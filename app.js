// load app server using express

const express = require('express')
const app = express();
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

const router = require('./routes/user.js')

app.use(router)

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))

app.get("/", (req, res) =>{
    console.log("Responding to root route")
    res.send("Hello from root")
})

//localhost 3000
app.listen(3000, () =>{
    console.log("Server up listening on 3000...")
})