import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: 'Sample name',
    price: 0,
    category: 'Sample category',
    brand: 'Sample brand',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
    image: '/images/sample.jpeg'
  });

  const productCreated = await product.save();

  if (productCreated) {
    res.status(201);
    res.json(productCreated);
  } else {
    res.status(404);
    throw new Error('Invalid product data');
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    category,
    brand,
    countInStock,
    numReviews,
    description,
    image
  } = req.body;

  const product = Product.findById(req.body.product.id);

  if (product) {
    product.user = req.user._id;
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || req.body.description;
    product.image = image || req.body.image;
    product.brand = brand || req.body.brand;
    product.category = category || req.body.category;
    product.countInStock = countInStock || req.body.countInStock;
    product.numReviews = numReviews || req.body.numReviews;

    const productUpdated = await product.save();

    res.status(201);
    res.json(productUpdated);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();

    res.status(200);
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
