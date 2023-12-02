const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const port = 3000

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json());

const uri = "mongodb+srv://syedmarif:xR91fydWB4tBZ6XM@cluster0.1gxqioy.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);

client.connect();

const dbName = "Client_Cridentials";
const collectionName = "Data";

const database = client.db(dbName);
const collection = database.collection(collectionName);

app.get('/', (req, res) => {
    res.send('/static')
})

app.put('/login', async(req, res) => {
    const formData = req.body;
    const Username = formData.email;
    const password = formData.password;
    const findOneQuery = { email: Username };
    console.log(findOneQuery);
    try {
        const findOneResult = await collection.findOne(findOneQuery);
        console.log(findOneResult);
        if (findOneResult === null) {

            res.json({ message: 'E-mail Not Exist' });


        } else {
            if (password == findOneResult.password) {
                // secure page
                res.json({ message: 'Login Successful'});
            } else {
                res.json({ message: 'Wrong Password' })
            }
        }
    } catch (err) {
        console.error(`Something went wrong trying to find one document: ${err}\n`);
    }
    // console.log('Form data submitted:', formData);

});


app.post('/signup-post', async (req, res) => {
    const formData = req.body;
    const Username = formData.email;
    console.log(Username);

    const findOneQuery = { email: Username };

    try {
        const findOneResult = await collection.findOne(findOneQuery);
        if (findOneResult === null) {

            try {
                const insertManyResult = client.db(dbName).collection(collectionName).insertOne(formData);
                //console.log(insertManyResult)
                res.json({ message: 'Email Registered Successfully!' });

                console.log(`(${insertManyResult.insertedCount}) documents successfully inserted.\n`);
            } catch (err) {
                console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
            }

        } else {
            res.json({ message: 'Email Already Exist!' });
            console.log('email exist')
            // console.log(`Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
        }
    } catch (err) {
        console.error(`Something went wrong trying to find one document: ${err}\n`);
    }
    // console.log('Form data submitted:', formData);

});



app.listen(port, () => {
    console.log('app is listerning http://localhost:3000')
})


