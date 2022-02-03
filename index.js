const express = require('express')
const connection = require('./db-config')
const app = express()
const port = 4242


app.get('/BerserkShop', (req, res) => {
    connection.query('SELECT * FROM annonces LIMIT 5', (err, result)=> {
        if (err) {
            console.error(err)
            res.status(500).send('Error retrieving data from database')
        } else {
            res.status(200).json(result)
        }
    })
})

app.get('/BerserkShop/filter', (req, res) => {
    connection.query('SELECT * FROM annonces ORDER BY id  LIMIT 5', (err, result)=> {
        if (err) {
            console.error(err)
            res.status(500).send('Error retrieving data from database')
        } else {
            res.status(200).json(result)
        }
    })
   
})

app.post('/BerserkShop/annonce/post', (req, res)=> {
    res.send('ça marche igo')
    const {name, prix, date, image, type, description} = req.body
    connection.query(
        'INSERT INTO annonce(name, prix, date, image, type, description) VALUES (?,?,?,?,?,?)',[name, prix, date, image, type, description],
        (err, result) => {
            if (err) {
                res.status(500).send('Error saving users')
            } else {
                res.status(200).send('User sucessfuly saved')
            }
        }
    )
    
})




app.listen(port, (err)=> {
    if (err) {
        console.error('Something bad happened')
    } else {
        console.log(`Server is listening on ${port}`)
    }
})


