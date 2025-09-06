const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel');
const ProductModel = require('../models/ProductModel');
const ProductSliderModel = require('../models/ProductSliderModel');
const ProductDetailModel = require('../models/ProductDetailModel');
const ReviewModel = require('../models/ReviewModel');



const BrandListService=async()=>{}
const CategoryListService=async()=>{}
const SliderListService=async()=>{}
const ListByBrandService=async()=>{}
const ListByCategoryService=async()=>{}
const ListByRemarkService=async()=>{}
const ListBySimilarService=async()=>{}
const ListByKeywordService=async()=>{}
const DetailsService=async()=>{}
const ReviewListService=async()=>{}

module.exports={
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListByRemarkService,
    ListBySimilarService,
    ListByKeywordService,
    DetailsService,
    ReviewListService
}