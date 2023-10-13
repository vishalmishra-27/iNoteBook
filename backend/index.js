const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express()
app.use(cors(
    {
        origin: ["https://i-note-book-frontend.vercel.app/"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: "true"
    }
));
const port = 80;

app.use(express.json()); //To read req.body

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

//Starting the server
app.listen(port, () => {
    console.log(`Application started on port ${port}`);
});