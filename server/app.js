//require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const db = require('./models/db')
const authRouter = require('./routes/auth');
const foldersRouter = require('./routes/folders');
const promptsRouter = require('./routes/prompts');
const businessesRouter = require('./routes/businesses');
const offersRouter = require('./routes/offers');
const templatesRouter = require('./routes/templates');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const port = process.env.PORT;
const store = require('./store');

const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('../client/build'));

app.use(session({
    store: store,
    secret: process.env.SESSIONSECRET,
    cookie: {
        maxAge: 172000000,
        httpOnly: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'lax'
    },
    saveUninitialized: true,
    resave: false,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production' ? true : false
}))

app.use(passport.initialize());
app.use(passport.session());

require('./controllers/auth');

app.get('/test', async (req, res) => {
    res.status(200).send('test')
});

app.use('/auth', cors({ credentials: true, origin: 'http://localhost:3000' }), express.json(), authRouter);
app.use('/folders', cors({ credentials: true, origin: 'http://localhost:3000' }), express.json(), foldersRouter);
app.use('/prompts', cors({ credentials: true, origin: 'http://localhost:3000' }), express.json(), promptsRouter);
app.use('/businesses', cors({ credentials: true, origin: 'http://localhost:3000' }), express.json(), businessesRouter);
app.use('/offers', cors({ credentials: true, origin: 'http://localhost:3000' }), express.json(), offersRouter);
app.use('/templates', cors({ credentials: true, origin: 'http://localhost:3000' }), express.json(), templatesRouter);

//general path for getting static pages
app.get("/*", (req, res) => {
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