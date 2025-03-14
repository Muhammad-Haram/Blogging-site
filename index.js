const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')

const userRoute = require('./routes/user')
const connectToDb = require('./connect')

const PORT = 3000;

mongoose.connect(connectToDb)

app.set('view engine', 'ejs');
app.set("views", path.resolve('./views'))

app.get('/', (req, res) => {
    res.render("home")
})

app.use('/user', userRoute)

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});