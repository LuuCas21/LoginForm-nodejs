const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

const { getRequest, getRegister, getLogin, getRequestLogin, postRequest } = require('./controllers/myControllers');

dotenv.config({ path: './config.env' });

const app = express();

const DB = process.env.MONGO_URL.replace('<PASSWORD>', process.env.MONGO_PASSWORD);

const publicDir = path.join(__dirname, './public');

app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs');

const connection = async () => {
    console.log('Connected to DB');
    await mongoose.connect(DB);
};

connection().catch(err => console.log(err));

app.get('/', getRequest);
app.get('/register', getRegister);
app.get('/login', getLogin);
app.post('/auth/login', getRequestLogin);
app.post('/auth/register', postRequest);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});