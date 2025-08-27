// seed/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// Import models
const Brand = require("../src/models/brandModel");
const Cart = require("../src/models/cartModel");
const Category = require("../src/models/categoryModel");
const Feature = require("../src/models/featuresModel");
const Invoice = require("../src/models/invoiceModel");
const InvoiceProduct = require("../src/models/invoiceProductModel");
const PaymentSetting = require("../src/models/paymentSettingsModel");
const ProductDetail = require("../src/models/productDetailsModel");
const Product = require("../src/models/productModel");
const Review = require("../src/models/productReviewModel");
const ProductSlider = require("../src/models/productSliderModel");
const Profile = require("../src/models/profileModel");
const User = require("../src/models/userModel");
const Wish = require("../src/models/wishModel");

// --------------------
// Connect to MongoDB
// --------------------
async function connectDB() {
  try {
    const mongoUrl = process.env.mongo_url;
    if (!mongoUrl) throw new Error("MongoDB connection string (mongo_url) missing in .env");
    await mongoose.connect(mongoUrl, { autoIndex: true });
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
}

// --------------------
// Seed Functions
// --------------------

// Users
// async function seedUsers() {
//   await User.deleteMany();
//   const emails = new Set();
//   const users = [];
//   while (users.length < 20) {
//     const email = faker.internet.email().toLowerCase();
//     if (!emails.has(email)) {
//       emails.add(email);
//       users.push({
//         email,
//         otp: faker.number.int({ min: 100000, max: 999999 }).toString(),
//       });
//     }
//   }
//   await User.insertMany(users);
//   console.log("✅ Users seeded");
// }

// Brands
async function seedBrands() {
  await Brand.deleteMany();
  const brandNames = new Set();
  const brands = [];
  while (brands.length < 20) {
    const name = faker.company.name();
    if (!brandNames.has(name)) {
      brandNames.add(name);
      brands.push({
        brandName: name,
        brandImg: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
      });
    }
  }
  await Brand.insertMany(brands);
  console.log("✅ Brands seeded");
}

// Categories
async function seedCategories() {
  await Category.deleteMany();
  const categoryNames = new Set();
  const categories = [];
  while (categories.length < 20) {
    const name = faker.commerce.department();
    if (!categoryNames.has(name)) {
      categoryNames.add(name);
      categories.push({
        categoryName: name,
        categoryImg: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
      });
    }
  }
  await Category.insertMany(categories);
  console.log("✅ Categories seeded");
}

// Products
async function seedProducts() {
  await Product.deleteMany();
  const categories = await Category.find();
  const brands = await Brand.find();
  const products = Array.from({ length: 20 }).map(() => {
    const hasDiscount = faker.datatype.boolean();
    const price = faker.commerce.price({ min: 100, max: 1000, dec: 0 });
    const discountPrice = hasDiscount
      ? (parseInt(price) - faker.number.int({ min: 10, max: 50 })).toString()
      : price;
    return {
      title: faker.commerce.productName(),
      shortDes: faker.commerce.productDescription(),
      price,
      discount: hasDiscount,
      discountPrice,
      image: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
      star: faker.number.int({ min: 1, max: 5 }).toString(),
      stock: faker.datatype.boolean(),
      remark: faker.lorem.words(3),
      categoryID: faker.helpers.arrayElement(categories)._id,
      brandID: faker.helpers.arrayElement(brands)._id,
    };
  });
  await Product.insertMany(products);
  console.log("✅ Products seeded");
}

// Product Details
async function seedProductDetails() {
  await ProductDetail.deleteMany();
  const products = await Product.find();
  const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
  const sizes = ["S", "M", "L", "XL"];
  const details = products.map((p) => ({
    img1: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    img2: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    img3: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    img4: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    img5: faker.datatype.boolean() ? faker.image.urlPicsumPhotos({ width: 200, height: 200 }) : undefined,
    img6: faker.datatype.boolean() ? faker.image.urlPicsumPhotos({ width: 200, height: 200 }) : undefined,
    des: faker.commerce.productDescription(),
    color: faker.helpers.arrayElement(colors),
    size: faker.helpers.arrayElement(sizes),
    productID: p._id,
  }));
  await ProductDetail.insertMany(details);
  console.log("✅ ProductDetails seeded");
}

// Features
async function seedFeatures() {
  await Feature.deleteMany();
  const features = Array.from({ length: 20 }).map(() => ({
    name: faker.commerce.productAdjective(),
    description: faker.lorem.sentence(),
    img: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
  }));
  await Feature.insertMany(features);
  console.log("✅ Features seeded");
}

// Reviews
// async function seedReviews() {
//   await Review.deleteMany();
//   const users = await User.find();
//   const products = await Product.find();
//   const reviews = Array.from({ length: 20 }).map(() => ({
//     userID: faker.helpers.arrayElement(users)._id,
//     productID: faker.helpers.arrayElement(products)._id,
//     des: faker.lorem.sentence(),
//     rating: faker.number.int({ min: 1, max: 5 }).toString(),
//   }));
//   await Review.insertMany(reviews);
//   console.log("✅ Reviews seeded");
// }

// Product Sliders
async function seedSliders() {
  await ProductSlider.deleteMany();
  const products = await Product.find();
  const sliders = products.map((p) => ({
    title: faker.commerce.productName(),
    des: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
    img: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
    productID: p._id,
  }));
  await ProductSlider.insertMany(sliders);
  console.log("✅ ProductSliders seeded");
}

// Profiles
// async function seedProfiles() {
//   await Profile.deleteMany();
//   const users = await User.find();
//   const profiles = users.map((u) => ({
//     userID: u._id,
//     cust_add: faker.location.streetAddress(),
//     cust_city: faker.location.city(),
//     cust_country: faker.location.country(),
//     cust_fax: faker.phone.number(),
//     cust_name: faker.person.fullName(),
//     cust_phone: faker.phone.number(),
//     cust_postcode: faker.location.zipCode(),
//     cust_state: faker.location.state(),
//     ship_add: faker.location.streetAddress(),
//     ship_city: faker.location.city(),
//     ship_country: faker.location.country(),
//     ship_name: faker.person.fullName(),
//     ship_phone: faker.phone.number(),
//     ship_postcode: faker.location.zipCode(),
//     ship_state: faker.location.state(),
//   }));
//   await Profile.insertMany(profiles);
//   console.log("✅ Profiles seeded");
// }

// Carts
// async function seedCarts() {
//   await Cart.deleteMany();
//   const users = await User.find();
//   const products = await Product.find();
//   const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
//   const sizes = ["S", "M", "L", "XL"];
//   const carts = [];
//   users.forEach((u) => {
//     const numberOfItems = faker.number.int({ min: 1, max: 3 });
//     for (let i = 0; i < numberOfItems; i++) {
//       const product = faker.helpers.arrayElement(products);
//       carts.push({
//         userID: u._id,
//         productID: product._id,
//         color: faker.helpers.arrayElement(colors),
//         price: product.price,
//         qty: faker.number.int({ min: 1, max: 5 }).toString(),
//         size: faker.helpers.arrayElement(sizes),
//       });
//     }
//   });
//   await Cart.insertMany(carts);
//   console.log("✅ Carts seeded");
// }

// Wishes
// async function seedWishes() {
//   await Wish.deleteMany();
//   const users = await User.find();
//   const products = await Product.find();
//   const wishes = [];
//   users.forEach((u) => {
//     const numberOfWishes = faker.number.int({ min: 1, max: 5 });
//     const selectedProducts = faker.helpers.arrayElements(products, numberOfWishes);
//     selectedProducts.forEach((p) => {
//       wishes.push({ userID: u._id, productID: p._id });
//     });
//   });
//   await Wish.insertMany(wishes);
//   console.log("✅ Wishes seeded");
// }

// Invoices
// async function seedInvoices() {
//   await Invoice.deleteMany();
//   const users = await User.find();
//   const invoices = users.map((u) => {
//     const total = faker.commerce.price({ min: 1000, max: 5000, dec: 0 });
//     const vat = (parseInt(total) * 0.1).toString();
//     return {
//       userID: u._id,
//       payable: total,
//       cust_details: `${faker.person.fullName()}, ${faker.location.streetAddress()}, ${faker.location.city()}`,
//       ship_details: `${faker.person.fullName()}, ${faker.location.streetAddress()}, ${faker.location.city()}`,
//       trans_id: faker.string.alphanumeric(12),
//       val_id: faker.string.alphanumeric(12),
//       delivery_status: faker.helpers.arrayElement(["pending", "shipped", "delivered"]),
//       payment_status: faker.helpers.arrayElement(["paid", "unpaid"]),
//       total,
//       vat,
//     };
//   });
//   await Invoice.insertMany(invoices);
//   console.log("✅ Invoices seeded");
// }

// Invoice Products
async function seedInvoiceProducts() {
  await InvoiceProduct.deleteMany();
  const invoices = await Invoice.find();
  const products = await Product.find();
  const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
  const sizes = ["S", "M", "L", "XL"];
  const invoiceProducts = [];
  invoices.forEach((inv) => {
    const numberOfItems = faker.number.int({ min: 1, max: 5 });
    const selectedProducts = faker.helpers.arrayElements(products, numberOfItems);
    selectedProducts.forEach((p) => {
      invoiceProducts.push({
        userID: inv.userID,
        invoiceID: inv._id,
        productID: p._id,
        qty: faker.number.int({ min: 1, max: 5 }).toString(),
        price: p.price,
        color: faker.helpers.arrayElement(colors),
        size: faker.helpers.arrayElement(sizes),
      });
    });
  });
  await InvoiceProduct.insertMany(invoiceProducts);
  console.log("✅ InvoiceProducts seeded");
}

// Payment Settings
async function seedPaymentSettings() {
  await PaymentSetting.deleteMany();
  const settings = [
    {
      store_id: faker.string.alphanumeric(10),
      store_pass: faker.string.alphanumeric(12),
      currency: "BDT",
      success_url: "https://example.com/success",
      fail_url: "https://example.com/fail",
      cancel_url: "https://example.com/cancel",
      ipn_url: "https://example.com/ipn",
      init_url: "https://example.com/init",
    },
    {
      store_id: faker.string.alphanumeric(10),
      store_pass: faker.string.alphanumeric(12),
      currency: "USD",
      success_url: "https://example.com/success",
      fail_url: "https://example.com/fail",
      cancel_url: "https://example.com/cancel",
      ipn_url: "https://example.com/ipn",
      init_url: "https://example.com/init",
    },
  ];
  await PaymentSetting.insertMany(settings);
  console.log("✅ PaymentSettings seeded");
}

// --------------------
// Run Seeder
// --------------------
async function runSeeder() {
  try {
    await connectDB();
    //await seedUsers();
    await seedBrands();
    await seedCategories();
    await seedProducts();
    await seedProductDetails();
    await seedFeatures();
    //await seedReviews();
    await seedSliders();
    //await seedProfiles();
    //await seedCarts();
    //await seedWishes();
    //await seedInvoices();
    //await seedInvoiceProducts();
    await seedPaymentSettings();
    console.log("🎉 All seeders executed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  }
}

runSeeder();
