const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/weather")
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((e) => {
        throw e;
    })