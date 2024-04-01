const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://vishalmishra270799:k79rwLlJtjqEbHYM@cluster0.vmxp78k.mongodb.net/'

const connectToMongo = () => {
    mongoose
        .connect(mongoURI)
        .then(console.log('MongoDB Atlas connected successfully'))
        .catch((err) => console.log("Mongo Error", err))
}

module.exports = connectToMongo;