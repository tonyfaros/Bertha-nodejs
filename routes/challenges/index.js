const bodyParser = require('body-parser')
const express = require('express')
const challenges = express.Router()


const bd_connection = require('../bd_connection.js');


challenges.use(bodyParser.urlencoded({extended: false}))

challenges.use(express.static('././public'))

challenges.post('/link_challenge/', (req, res) => {

    const connection = bd_connection

    const id_user = req.body.id_user
    const id_challenge = req.body.id_challenge

    const action = 'newChallenge'

    const query_addChallenge = "CALL `heroku_cd69aac1f1eff94`.`link_challengeXuser`( ?, ?, ?);"

    connection.query(query_addChallenge, [id_user,id_challenge,action], (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: Link challenge")
            res.end()
            return
        }
        
        res.send("Exito")
        console.log("Exito")
    })

})

challenges.post('/link_group_challenge/', (req, res) => {

    const connection = bd_connection

    var data = JSON.parse(req.body["params"])
    var jsonPretty = JSON.stringify(data,null,2);  
    const jsonLen = Object.keys(data).length - 1;

    const id_challengeSended = data.id_challenge

    console.log("Trying pretty json: "+jsonPretty)
    console.log("Trying data json: "+data.id_group0)
    console.log("Trying data json: "+data.id_challenge)
    console.log("Trying json length: "+jsonLen)
    
    //const id_challenge = req.body.id_challenge

    //console.log(id_challenge)

    
    const action = 'new'

    const query_addChallenge = "CALL `heroku_cd69aac1f1eff94`.`groups_x_challenge`( ?, ?, ?);"

    for(var i = 0; i < jsonLen; i++){

        connection.query(query_addChallenge, [id_challengeSended,data.id_group+i,action], (err, rows)=>{
            if(err){
                res.sendStatus(500)
                console.log(err)
                console.log("HERE: Link challenge with group")
                res.end()
                return
            }
            
            res.send("Exito")
            console.log("Exito")
            
        })
    }
})

function helper_postLink(id_challenge,id_group){
    const connection = bd_connection

    const action = 'new'

    const query_addChallenge = "CALL `heroku_cd69aac1f1eff94`.`groups_x_challenge`( ?, ?, ?);"

    connection.query(query_addChallenge, [id_challenge,id_group,action], (err,res, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: Link challenge with group")
            res.end()
            return
        }
        
        console.log("Exito")
        res.end()
    })
}

challenges.post('/drop_challenge/', (req, res) => {

    const connection = bd_connection

    const id_challenge = req.body.id_challenge
    const id_user = req.body.id_user
    const action = 'dropChallenge'

    const query_dropChallenge = "CALL `heroku_cd69aac1f1eff94`.`link_challengeXuser`( ?, ?, ?);"

    connection.query(query_dropChallenge, [id_user,id_challenge,action], (err, rows)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            console.log("HERE: Drop challenge")
            res.end()
            return
        }
        
        res.send("Exito")
        console.log("Exito")
    })

})

module.exports = challenges