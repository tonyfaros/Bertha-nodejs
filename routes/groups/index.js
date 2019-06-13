
const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express')
const groups = express.Router()

const bd_connection = require('../bd_connection.js');

groups.use(bodyParser.urlencoded({extended: false}))

groups.use(express.static('././public'))


groups.post('/create_group/', (req, res) => {

    const connection = bd_connection

    const id_user = req.body.id_user
    const id_car = req.body.id_car

    const name_group = req.body.name_group
    const description_group = req.body.description_group
    const action = 'new'

    const query_new_group = "CALL `heroku_cd69aac1f1eff94`.`groups_data`('',?,?,?,?,?);"
    const paramId = req.params.id
    connection.query(query_new_group, [id_user,id_car,name_group,description_group,action], (err,res2, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: POST GROUP")
            res.end()
            return
        }

        res.send(res2[0][0])
        console.log(res2[0][0])
    })

})



module.exports = groups