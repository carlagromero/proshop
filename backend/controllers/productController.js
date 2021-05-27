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
  const { name, price, category, brand, countInStock, description, image } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.user = req.user._id;
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

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

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      item => item.user === req.user._id
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
      product.numReviews;

    await product.save();

    res.status(201);
    res.json({ message: 'Review added' });
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
  deleteProduct,
  createProductReview
};
