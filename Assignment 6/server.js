const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/users');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('assigment-6');
});


// URL-encoded password
const encodedPassword = encodeURIComponent('!@#$%^');

// Update connection string
mongoose.connect(`mongodb+srv://Chandrima:${encodedPassword}@cluster-restapi.hlphbne.mongodb.net/RESAPI(CRUD)?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port localhost:${port}`);
    });
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log(error);
});

app.use('/users', userRoutes);
