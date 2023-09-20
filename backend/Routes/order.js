const express = require("express");
const router = express.Router();
const Order = require('../Models/order');
const Transaction = require('../Models/transaction');


router.post('/place', async (req, res) => {
  try {
    const ordersToPlace = req.body;

    const placedOrUpdatedOrders = [];
    for (const orderData of ordersToPlace) {
      const { userid, productid, sellerid, quantity, price, total } = orderData;

      const existingOrder = await Order.findOne({
        userid,
        productid,
        sellerid,
        status: 'waiting for confirmation',
      });

      if (existingOrder) {

        existingOrder.quantity = quantity;
        existingOrder.price = price;
        existingOrder.total = total;

        const updatedOrder = await existingOrder.save();
        placedOrUpdatedOrders.push(updatedOrder);
      } else {
        
        const newOrder = new Order({
          userid,
          productid,
          sellerid,
          quantity,
          price,
          total,
          status: 'waiting for confirmation',
        });
        await newOrder.save();
        placedOrUpdatedOrders.push(newOrder);
      }
    }

    res.status(200).json(placedOrUpdatedOrders);
  } catch (error) {
    console.error('Error placing or updating orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.get('/user/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const order = await Order.find({ userid })
      .populate({ path: 'productid', model: 'Products' })
      .exec();

    const data = order.map((order) => ({
      productId: order.productid._id,
      productDetails: order.productid,
      total: order.total,
      quantity: order.quantity,
      orderid: order._id,
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/dsplywaiting/:userid', async (req, res) => {
  try {
    const { userid } = req.params;

    // Find orders with the specified user ID and status 'waiting for confirmation'
    const orders = await Order.find({ userid, status: 'waiting for confirmation' })
      .populate({ path: 'productid', model: 'Products' })
      .exec();

    // Map the orders to the desired data format
    const orderDetails = orders.map((order) => ({
      productId: order.productid._id,
      productDetails: order.productid,
      total: order.total,
      price: order.price,
      quantity: order.quantity,
      orderid: order._id,
    }));

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/profile/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { name, mobile1, pincode, place, address, city, state, landmark, mobile2 } = req.body;

    const updatedProfile = await Order.findOneAndUpdate(
      { _id: orderId }, // Filter criteria based on orderId
      { name, mobile1, pincode, place, address, city, state, landmark, mobile2 }, // Update data
      { new: true } // To return the updated document
    );

    if (updatedProfile) {
      // The profile was found and updated
      res.status(200).json(updatedProfile);
    } else {
      // Profile not found
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: "Server error" });
  }
});

  router.post('/viewOrder', async (req, res) => {
    try {
      const viewOrders = await Order.find({ status: { $ne: 'waiting for confirmation' } })
        .populate({ path: 'productid', model: 'Products' })
        .exec();
  
      const data = viewOrders.map((order) => ({
        orderId: order._id,
        product: {
          productId: order.productid._id,
          productName: order.productid.productName,
          productCategory: order.productid.category,
          image: order.productid.image,
          sellerid: order.productid.sellerid
        },
        orderid: order._id,
        userid: order.userid,
        sellerid: order.sellerid,
        status: order.status,
        total: order.total,
        quantity: order.quantity,
        place:order.place,
      }));
  
      res.json(data);
    } catch (error) {
      console.error('Error fetching order history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/getorderbyuserid/:userid', async (req, res) => {
    try {
      const { userid } = req.params;
      const viewOrders = await Order.find({ status: { $ne: 'waiting for confirmation' }, userid })
        .populate({ path: 'productid', model: 'Products' })
        .exec();
  
      const data = await Promise.all(viewOrders.map(async (order) => {
        
        const transaction = await Transaction.findOne({ orderid: order._id });
        
        return {
          orderId: order._id,
          product: {
            productId: order.productid._id,
            productName: order.productid.productName,
            image: order.productid.image,
          },
          status: order.status,
          total: order.total,
          date: order.deliverydate,
          payment: transaction ? transaction.mode : '', // Get the payment from the transaction's mode
        };
      }));
  
      res.json(data);
    } catch (error) {
      console.error('Error fetching order history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.put('/statusUpdate/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { new: true }
    );

    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/viewveriOrder', async (req, res) => {
  try {
    const viewOrders = await Order.find({ status: { $ne: 'delivered' } })
      .populate({ path: 'productid', model: 'Products' })
      .exec();

    const data = viewOrders.map((order) => ({
      orderId: order._id,
      product: {
        productId: order.productid._id,
        productName: order.productid.productName,
        productCategory: order.productid.category,
        image: order.productid.image,
        sellerid: order.productid.sellerid
      },
      userid: order.userid,
      status: order.status,
      total: order.total,
      quantity: order.quantity,
      place: order.place,
    }));

    res.json(data);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/increment/:orderId', async (req, res) => {
  try{
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (order) {
      // Increment the quantity by 1
      order.quantity = parseInt(order.quantity) + 1;

      // Recalculate the total price
      order.total = (parseFloat(order.price) * order.quantity).toString();

      // Save the updated order
      await order.save();

      return res.status(200).json({ message: 'Quantity incremented successfully', order });
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error incrementing quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/decrement/:orderId', async (req, res) => {
  try{
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (order) {
      // Increment the quantity by 1
      order.quantity = parseInt(order.quantity) - 1;

      // Recalculate the total price
      order.total = (parseFloat(order.price) * order.quantity).toString();

      // Save the updated order
      await order.save();

      return res.status(200).json({ message: 'Quantity incremented successfully', order });
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error incrementing quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const { status } = req.query;

    // Find and delete orders with the specified user ID and status
    await Order.deleteMany({ userid, status });

    res.status(200).json({ message: `Orders with status "${status}" deleted successfully.` });
  } catch (error) {
    console.error('Error deleting orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getOrderDetails/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const status = 'waiting for confirmation';

    const order = await Order.findOne({ userid, status }).select('_id productid address');

    if (order) {
      const { _id: orderId, productid: productId, address } = order;
      res.status(200).json({ orderId, productId, address });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error getting order details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/confirmOrder/:orderid', async (req, res) => {
  try {
    const { orderid } = req.params;

    // Find the order by orderid and update its status and delivery date
    const updatedOrder = await Order.findByIdAndUpdate(
      orderid,
      {
        status: 'confirmed',
        deliverydate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Current date + 2 days
      },
      { new: true } // This option returns the updated order
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    updatedOrder.transactionid = req.body.transactionId;

    // Save the updated order with the transaction ID and delivery date
    await updatedOrder.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/getOrderDetails/:orderid', async (req, res) => {
  try {
    const { orderid } = req.params;

    const orderDetails = await Order.findById(orderid)

    if (!orderDetails) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getOrderIdIf/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId });
    const transaction = await Transaction.findOne({ orderid: orderId });

    if (!order || !transaction) {
      return res.status(404).json({ message: 'Order or Transaction not found' });
    }

    if (order.status !== 'delivered' && transaction.mode === 'cod') {
      
      res.status(200).json({ orderId: order._id });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.error('Error fetching order and transaction:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/countOrders', async (req, res) => {
  try {
    const orderCount = await Order.countDocuments({ status: 'Delivered' });
    res.json({ count: orderCount });
  } catch (error) {
    console.error('Error counting order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

  module.exports = router;