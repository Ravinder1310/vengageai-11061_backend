import mongoose from "mongoose";


const recentsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }

},{timestamps:true})

export default mongoose.model('Recents',recentsSchema)