const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://vishalmishra27:vishalmongodb01@cluster0.cry4jjy.mongodb.net/test?retryWrites=true&w=majority'

const connectToMongo = () => {
    mongoose
        .connect(mongoURI)
        .catch((err) => console.log("Mongo Error", err))
}

module.exports = connectToMongo;