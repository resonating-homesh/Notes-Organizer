const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://root:root@cluster0.dei4k2z.mongodb.net/test"
const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("connnected");
    })
}

module.exports = connectToMongo;