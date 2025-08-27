const mongoose = require('mongoose');


const dataSchema = mongoose.Schema({
    BrandName: {type: String, unique: true, required: true},
    BrandImg: {type: String, unique: true, required: true}
}, {timestamps: true, versionKey: false}
)

const brandModel = mongoose.model('brands', dataSchema)

module.exports = brandModel