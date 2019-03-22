// load app server using express

const express = require('express')
const app = express();
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

const router = require('./routes')


app.use('/',router)

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))

app.get("/", (req, res) =>{
    console.log("Responding to root route")
    res.send("Hello from root")
})

//localhost 3000

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log("Server up listening on... " + PORT)
})