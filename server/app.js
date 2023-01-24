require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const db = require('./models/db')

app.use(express.static('public'));
const cors = require('cors');

app.use(cors());

app.get('/test', async (req, res) => {
    res.status(200).send('test')
});

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
})