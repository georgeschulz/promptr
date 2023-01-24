require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const db = require('./models/db')

app.use(express.static('public'));
const cors = require('cors');

app.use(cors());

app.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM users');
    res.send(rows);
});

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
})