const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
        name: {type:String, required:true},
        description: {type:String, required:true},
        img: {type:String, required:true},

    },
    {timestamps:true,versionKey:false}
)
const featuresModel=mongoose.model('features',DataSchema)
module.exports=featuresModel