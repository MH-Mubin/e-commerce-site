const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
        UserID:{type:mongoose.Schema.Types.ObjectId,required:true},
        ProductID:{type:mongoose.Schema.Types.ObjectId,required:true},
        des: {type:String, required:true},
        rating: {type:String, required:true},
        
    },
    {timestamps:true,versionKey:false}
)
const productReviewModel=mongoose.model('reviews',DataSchema)
module.exports=productReviewModel