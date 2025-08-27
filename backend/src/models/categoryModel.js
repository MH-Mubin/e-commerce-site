const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    CategoryName: { type: String, unique: true, required: true},
    CategoryImg: {type: String, required: true}
}, {timestamps: true, versionKey: false}
)

const categoryModel = mongoose.model('categories', dataSchema)
module.exports = categoryModel;