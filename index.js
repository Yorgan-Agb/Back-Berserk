const express = require('express')
const connection = require('./db-config')
const cors = require('cors')
const app = express()
const port = 4242

app.use(cors())


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

app.get('/BerserkShop/categories/:id', (req, res) => {
    const categorieId = req.params.id;
    connection.query(
        'SELECT * FROM annonces WHERE categories_id = ?',
        [categorieId],
        (err, result) => {
            if(err) {
              console.error(err);
              res.status(500).send('Error retrieving this categorie');
            } else {
                res.status(200).json(result);
            }
        }
    )
});

app.get('/BerserkShop/etats/:id', (req, res) => {
    const etatsId = req.params.id;
    connection.query(
        'SELECT * FROM annonces WHERE etats_id = ?',
        [etatsId],
        (err, result) => {
            if(err) {
                console.error(err);
                res.status(500).send('Error retrieving this etats');
            } else {
                res.status(200).json(result);
            }
        }
    )
});

app.get('/BerserkShop/dates/:id', (req, res) => {
    const datesId = req.params.id;
    connection.query(
        'SELECT * FROM annonces WHERE dates_id = ?',
        [datesId],
        (err, result) => {
            if(err) {
                console.error(err);
                res.status(500).send('Error retrieving this dates');
            } else {
                res.status(200).json(result);
            }
        }
    )
});

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


