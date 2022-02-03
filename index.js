const connection = require('./db-config')
const express = require('express')
const app = express()
const port = 4242

app.use(express.json())

app.get('/BerserkShop', (req, res) => {
    connection.query('SELECT * FROM annonces ORDER BY RAND()', (err, result)=> {
        if (err) {
            console.error(err)
            res.status(500).send('Error retrieving data from database')
        } else {
            res.status(200).json(result)
        }
    })
})

app.get('/BerserkShop/filter/', (req, res) => {
    connection.query('SELECT * FROM bersekrshop.categories WHERE id = ?', (err, result)=> {
        if (err) {
            console.error(err)
            res.status(500).send('Error retrieving data from database')
        } else {
            res.status(200).json(result)
        }
    })
   
})

app.post('/BerserkShop/annonce/post', (req, res) => {
    
    const {prix, dates_id, name, image, describe, categories_id, etats_id} = req.body
    const sql = "INSERT INTO `bersekrshop`.`annonces` (`prix`, `name`, `image`, `describe`, `categories_id`, `etats_id`, `dates_id`) VALUES (?, ?, ?,?,?,?,?)"

    connection.query(sql,[prix, name, image, describe, categories_id, etats_id, dates_id],
        (err, result) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send('Annonce sucessfuly saved')
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


