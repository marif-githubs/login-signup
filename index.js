const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const authRouter = require("./Routes/authRouters");

const app = express()

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')))

app.use('/userAuth',authRouter)




app.listen(port, () => {
    console.log(`app is listerning http://localhost:${port}`)
})


