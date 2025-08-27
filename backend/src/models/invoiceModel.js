const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
        UserID:{type:mongoose.Schema.Types.ObjectId,required:true},
        payable: {type:String, required:true},
        cust_details: {type:String, required:true},
        ship_details: {type:String, required:true},
        trans_id: {type:String, required:true},
        val_id: {type:String, required:true},
        delivery_status: {type:String, required:true},
        payment_status: {type:String, required:true},
        total: {type:String, required:true},
        vat: {type:String, required:true},
        
    },
    {timestamps:true,versionKey:false}
)
const invoiceModel=mongoose.model('invoices',DataSchema)
module.exports=invoiceModel