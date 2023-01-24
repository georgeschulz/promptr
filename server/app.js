require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const db = require('./models/db')

app.use(express.static('public'));
const cors = require('cors');

app.use(cors());

app.get('/test', async (req, res) => {
    res.status(200).send('test')
});

//general path for getting static pages
app.get("/*", cors({ credentials: true, origin: 'http://localhost:3000' }), (req, res) => {
    if(process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"), (err) => {
            if(err) {
                console.log('Incorrect path');
                res.status(500).send()
            }
        });
    } else {
        res.redirect('https://localhost:3000/');
    }
})

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
})