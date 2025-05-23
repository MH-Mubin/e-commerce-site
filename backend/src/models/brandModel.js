const mongoose = require('mongoose');


const dataSchema = mongoose.Schema({
    brandName: {type: string, unique: true},
    brandImg: {type: string, unique: true}
}, {timestamps: true, versionKey: false}
)

const brandModel = mongoose.model('brands', dataSchema)

module.exports = brandModel