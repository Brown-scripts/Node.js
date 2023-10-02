const config=require('config');
const mongoose =require('mongoose');
const genre = require('./routes/genre');
const customer = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const user = require('./routes/user');
const auth = require('./routes/auth');
const express = require ('express');
const app = express();

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://127.0.0.1:27017/playground')
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=>console.error('Could not connect to MongoDB...',err));

app.use(express.json());
app.use('/api/genre',genre);
app.use('/api/rentals',rentals);
app.use('/api/customer',customer);
app.use('/api/movies',movies);
app.use('/api/user',user);
app.use('/api/auth',auth);





const port = process.env.PORT|| 3000;
app.listen(port,()=> console.log(`listening on port ${port}...`));

 