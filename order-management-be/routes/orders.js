const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const { v4: uuidv4 } = require('uuid');


const router = express.Router();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
console.log({ supabaseUrl });
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch all orders
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("orders").select("*");

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post("/new", async (req, res) => {
  // customer_id
  // order_date
  // order_status
  // total_amount
  const { customerId, orderDate, orderStatus, orderItems } = req.body;

  if (!customerId || !orderDate || !orderStatus || !orderItems) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const totalAmount = orderItems.reduce((sum, item) => {
      return sum + item.quantity * item.unitPrice;
    }, 0);

    const updatedOrderItems = orderItems.map((item) => {
      // totalAmount += (item.quantity * item.unitPrice);
      return {
        quantity: item.quantity, // Keep the 'quantity' key as is
        unit_price: item.unitPrice, // Rename 'unitPrice' to 'unit_price'
        product_name: item.productName,
      };
    });

    const { data, error } = await supabase.rpc("create_order_with_items", {
      customer_id: customerId,
      order_date: orderDate,
      order_status: orderStatus,
      order_items: updatedOrderItems,
      total_amount: totalAmount
    });

    if (error) throw error;

    //   const { data: orderData, error: orderError } = await supabase
    //   .from('orders')
    //   .insert([{ customer_id: customerId, order_date: orderDate, order_status: orderStatus, total_amount: totalAmount }]);

    //   if(orderError)
    //     throw orderError;
    // // let totalAmount = 0;

    // const { data: orderItemsData, error: orderItemsError } = await supabase
    // .from('order_items')
    // // .insert([{ customer_id: customerId, order_date: orderDate, order_status: orderStatus, price }]);
    // .insert(updatedOrderItems);

    // if (orderItemsError) throw orderItemsError;

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
