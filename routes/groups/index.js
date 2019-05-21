
const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express')
const groups = express.Router()


groups.use(bodyParser.urlencoded({extended: false}))

groups.use(express.static('././public'))


groups.post('/create_group/', (req, res) => {

    const connection = getConnection()

    const id_user = req.body.id_user
    const id_car = req.body.id_car

    const name_group = req.body.name_group
    const description_group = req.body.description_group
    const action = 'new'

    const query_new_group = "CALL `heroku_cd69aac1f1eff94`.`groups_data`('',?,?,?,?,?,  @id_out_group, @id_out_user );"
    const paramId = req.params.id
    connection.query(query_new_group, [id_user,id_car,name_group,description_group,action], (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: " + last_name)
            res.end()
            return
        }
       
        res.send("Exito")
        console.log("Exito")
    })

})

const pool = mysql.createPool({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    //port: '3306',
    user: 'b2422c79d1fa8f',
    password: '8649bbd4',
    database:'heroku_cd69aac1f1eff94',
    multipleStatements: 'true'

})

function getConnection(){
    return pool
}

module.exports = groups