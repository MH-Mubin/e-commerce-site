const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
        UserID:{type:mongoose.Schema.Types.ObjectId,required:true},
        ProductID:{type:mongoose.Schema.Types.ObjectId,required:true}
    },
    {timestamps:true,versionKey:false}
)
const wishModel=mongoose.model('wishes',DataSchema)
module.exports=wishModel