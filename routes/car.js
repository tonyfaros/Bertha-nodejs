const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express')

const router = express.Router()
router.use(bodyParser.urlencoded({extended: false}))

router.use(express.static('././public'))


router.post('/car_create/', (req, res) =>{
    
    const make = req.body.make
    const model = req.body.model
    const year = req.body.year
    const license_plate = req.body.license_plate
    const fuel_type = req.body.fuel_type
    const weigh_kg = req.body.weigh_kg
    const model_trim = req.body.model_trim
    const engine_cc = req.body.engine_cc
    const length_mm = req.body.length_mm
    const width_mm = req.body.width_mm
    const height_mm = req.body.height_mm
    const mpg_hwy = req.body.mpg_hwy       //HAY QUE CAMBIARLO
    const mpg_city = req.body.mpg_city       //HAY QUE CAMBIARLO
    const mpg_mixed = req.body.impg_mixedd       //HAY QUE CAMBIARLO
    const body_style = req.body.body_style
    const door_number = req.body.door_number
    const drive = req.body.drive
    const engine_position = req.body.engine_position
    const engine_type = req.body.engine_type

    const queryString = "insert into cars (make, model,year,licence_plate,fuel_type, weigh_kg,model_trim,engine_cc, length_mm, width_mm,height_mm,mpg_hwy,mpg_city, mpg_mixed,body_style,door_number,drive,engine_position,engine_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"


  
    getConnection().query(queryString, [make,model,year,license_plate,fuel_type,weigh_kg,model_trim,engine_cc,length_mm,width_mm,height_mm
        ,mpg_hwy,mpg_city,mpg_mixed,body_style,door_number,drive,engine_position,engine_type], (err,res,fields) => {
        if(err){
            console.log(err)
            console.log("ERROR")
            return
        }
        console.log("Inserted the new car: " , res)
        
    })
    res.end()
    
})


router.get('/cars/', (req, res) => {
    

    const connection = getConnection()

    const queryString = 'select * from cars'
    connection.query(queryString, (err, rows, fields)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
            res.end()
            return
        }
        res.json(rows)
    })

})

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'us-cdbr-iron-east-03.cleardb.net',
    //port: '3306',
    user: 'b2422c79d1fa8f',
    password: '8649bbd4',
    database:'heroku_cd69aac1f1eff94'

})

function getConnection(){
    return pool
}

module.exports = router