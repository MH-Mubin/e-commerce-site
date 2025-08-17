const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
        userID:{type:mongoose.Schema.Types.ObjectId,required:true},
        cust_add:{type:String},
        cust_city:{type:String},
        cust_country:{type:String},
        cust_fax:{type:String},
        cust_name:{type:String},
        cust_phone:{type:String},
        cust_postcode:{type:String},
        cust_state:{type:String},
        ship_add:{type:String},
        ship_city:{type:String},
        ship_country:{type:String},
        ship_name:{type:String},
        ship_phone:{type:String},
        ship_postcode:{type:String},
        ship_state:{type:String},
    },
    {timestamps:true,versionKey:false}
)
const profileModel=mongoose.model('profiles',DataSchema)
module.exports=profileModel