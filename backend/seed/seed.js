// seed/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// Import models (capitalize for clarity)
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

// ✅ Connect DB
async function connectDB() {
  try {
    const mongoUrl = process.env.mongo_url;
    if (!mongoUrl) {
      throw new Error("MongoDB connection string (mongo_url) missing in .env");
    }
    await mongoose.connect(mongoUrl, { autoIndex: true });
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
}

// ✅ Seed functions
async function seedUsers() {
  await User.deleteMany();
  const users = Array.from({ length: 20 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    otp: Math.floor(100000 + Math.random() * 900000),
    role: faker.helpers.arrayElement(["customer", "admin"]),
  }));
  await User.insertMany(users);
  console.log("✅ Users seeded");
}

async function seedBrands() {
  await Brand.deleteMany();
  const brands = Array.from({ length: 20 }).map(() => ({
    name: faker.company.name(),
    description: faker.lorem.sentence(),
  }));
  await Brand.insertMany(brands);
  console.log("✅ Brands seeded");
}

async function seedCategories() {
  await Category.deleteMany();
  const categories = Array.from({ length: 20 }).map(() => ({
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  }));
  await Category.insertMany(categories);
  console.log("✅ Categories seeded");
}

async function seedProducts() {
  await Product.deleteMany();
  const categories = await Category.find();
  const brands = await Brand.find();
  const products = Array.from({ length: 20 }).map(() => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.number.int({ min: 0, max: 500 }),
    category: faker.helpers.arrayElement(categories)._id,
    brand: faker.helpers.arrayElement(brands)._id,
  }));
  await Product.insertMany(products);
  console.log("✅ Products seeded");
}

async function seedProductDetails() {
  await ProductDetail.deleteMany();
  const products = await Product.find();
  const details = products.map((p) => ({
    product: p._id,
    description: faker.commerce.productDescription(),
    specs: faker.lorem.words(10),
  }));
  await ProductDetail.insertMany(details);
  console.log("✅ ProductDetails seeded");
}

async function seedFeatures() {
  await Feature.deleteMany();
  const features = Array.from({ length: 20 }).map(() => ({
    title: faker.commerce.productAdjective(),
    description: faker.lorem.sentence(),
  }));
  await Feature.insertMany(features);
  console.log("✅ Features seeded");
}

async function seedReviews() {
  await Review.deleteMany();
  const users = await User.find();
  const products = await Product.find();
  const reviews = Array.from({ length: 20 }).map(() => ({
    user: faker.helpers.arrayElement(users)._id,
    product: faker.helpers.arrayElement(products)._id,
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.sentence(),
  }));
  await Review.insertMany(reviews);
  console.log("✅ Reviews seeded");
}

async function seedSliders() {
  await ProductSlider.deleteMany();
  const products = await Product.find();
  const sliders = products.map((p) => ({
    product: p._id,
    image: faker.image.urlPicsumPhotos(),
  }));
  await ProductSlider.insertMany(sliders);
  console.log("✅ ProductSliders seeded");
}

async function seedProfiles() {
  await Profile.deleteMany();
  const users = await User.find();
  const profiles = users.map((u) => ({
    user: u._id,
    address: faker.location.streetAddress(),
    phone: faker.phone.number(),
  }));
  await Profile.insertMany(profiles);
  console.log("✅ Profiles seeded");
}

async function seedCarts() {
  await Cart.deleteMany();
  const users = await User.find();
  const products = await Product.find();
  const carts = users.map((u) => ({
    user: u._id,
    items: [
      {
        product: faker.helpers.arrayElement(products)._id,
        quantity: faker.number.int({ min: 1, max: 5 }),
      },
    ],
  }));
  await Cart.insertMany(carts);
  console.log("✅ Carts seeded");
}

async function seedWishes() {
  await Wish.deleteMany();
  const users = await User.find();
  const products = await Product.find();
  const wishes = users.map((u) => ({
    user: u._id,
    product: faker.helpers.arrayElement(products)._id,
  }));
  await Wish.insertMany(wishes);
  console.log("✅ Wishes seeded");
}

async function seedInvoices() {
  await Invoice.deleteMany();
  const users = await User.find();
  const invoices = users.map((u) => ({
    user: u._id,
    total: faker.commerce.price(),
    status: faker.helpers.arrayElement(["paid", "pending"]),
  }));
  await Invoice.insertMany(invoices);
  console.log("✅ Invoices seeded");
}

async function seedInvoiceProducts() {
  await InvoiceProduct.deleteMany();
  const invoices = await Invoice.find();
  const products = await Product.find();
  const invoiceProducts = invoices.map((inv) => ({
    invoice: inv._id,
    product: faker.helpers.arrayElement(products)._id,
    quantity: faker.number.int({ min: 1, max: 5 }),
    price: faker.commerce.price(),
  }));
  await InvoiceProduct.insertMany(invoiceProducts);
  console.log("✅ InvoiceProducts seeded");
}

async function seedPaymentSettings() {
  await PaymentSetting.deleteMany();
  const settings = [
    { method: "stripe", enabled: true },
    { method: "paypal", enabled: true },
    { method: "cod", enabled: true },
  ];
  await PaymentSetting.insertMany(settings);
  console.log("✅ PaymentSettings seeded");
}

// ✅ Run Seeder
async function runSeeder() {
  await connectDB();
  await seedUsers();
  await seedBrands();
  await seedCategories();
  await seedProducts();
  await seedProductDetails();
  await seedFeatures();
  await seedReviews();
  await seedSliders();
  await seedProfiles();
  await seedCarts();
  await seedWishes();
  await seedInvoices();
  await seedInvoiceProducts();
  await seedPaymentSettings();
  console.log("🎉 All seeders executed successfully");
  process.exit(0);
}

runSeeder();
