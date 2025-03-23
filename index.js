const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const authRouter = require("./Routes/authRouters");
const cookieParser = require('cookie-parser');

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')))

app.use('/userAuth', authRouter)

//DONE TILL TOKEN SAVE IN BROWSER COOKIE USING HTTPSONLY .

app.listen(port, () => {
    console.log(`app is listerning http://localhost:${port}`)
})


