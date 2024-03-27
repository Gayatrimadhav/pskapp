const mongoose=require('mongoose');//import
const mongoURI="mongodb://43.205.140.171:27017/ebookdata"
const connectToMongo=async()=>{
    try{
        mongoose.set('strictQuery',false)
        mongoose.connect(mongoURI)
        console.log("mongo connected")

    }
    catch(error)
    {
        console.log(error)
        process.exit()

    }
}
module.exports=connectToMongo
