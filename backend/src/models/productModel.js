const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    title:{type: String, required: true},
    ShortDes:{type: String, required: true},
    price:{type: String, required: true},
    discount:{type: Boolean, required: true},
    DiscountPrice:{type: String, required: true},
    image:{type: String, required: true},
    star:{type: String, required: true},
    stock:{type: Boolean, required: true},
    remark:{type: String, required: true},
    CategoryID:{type: mongoose.Schema.Types.ObjectId, required: true},
    BrandID:{type: mongoose.Schema.Types.ObjectId, required: true}
}, {timestamps: true, versionKey: false}
)

const productModel = mongoose.model('products', dataSchema)
module.exports = productModel;