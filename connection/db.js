const mongoose = require('mongoose');

Connection = async (mongo_url) => {
    try {   
        const URL = mongo_url ;
        await mongoose.connect(URL, { useNewUrlParser: true })
        
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error);
    }
}

module.exports = Connection;