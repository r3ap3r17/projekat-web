const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
const mongodb = process.env.DB_URL;
mongoose.connect(mongodb);
const db = mongoose.connection;

db.on('error', () => console.log("Error !"));
db.once('connected', () => console.log('Database connected succesfuly !'));

const app = express();
const port = 3000;

app.use(express.json());
const routes = require('./routes/routes');
app.use('/api', routes);

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(port, () => console.log(`Server listening on port ${port}!`));