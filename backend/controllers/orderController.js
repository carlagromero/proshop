import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems) {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    if (createOrder) {
      res.status(201).json(createdOrder);
    }
  } else {
    res.status(400);
    throw new Error('No order items');
  }
});

export { createOrder };
