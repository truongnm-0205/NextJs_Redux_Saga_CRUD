const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')



// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: './config/config.env' })
// dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

const posts = require('./routes/post');
const auth = require('./routes/auth')


app.use('/api/v1', posts)
app.use('/api/v1',auth)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


module.exports = app