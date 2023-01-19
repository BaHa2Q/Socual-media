const mongoose = require('mongoose')
const config = require('config')
const db = config.get("mongoURL")


const connectDB = async () => {
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true
        })
        console.log("Database is running")
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}
// mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true}).then((result) => console.log("Database is running")).catch((err) => console.log(err))
module.exports = connectDB