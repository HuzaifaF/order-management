import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const CreateOrder = () => {
  const [customerId, setCustomerId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [orderItems, setOrderItems] = useState([{ productName: '', quantity: 1, unitPrice: 0 }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert the order into Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([{ customer_id: customerId, order_date: orderDate, order_status: orderStatus, total_amount: 0 }]);

    if (error) {
      console.error('Error creating order:', error);
      return;
    }

    const newOrderId = data[0].id;

    // Insert order items into Supabase
    const items = orderItems.map(item => ({
      order_id: newOrderId,
      product_name: item.productName,
      quantity: item.quantity,
      unit_price: item.unitPrice
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(items);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      return;
    }

    // Reset form
    setCustomerId('');
    setOrderDate('');
    setOrderStatus('');
    setOrderItems([{ productName: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index][field] = value;
    setOrderItems(newOrderItems);
  };

  const addItem = () => {
    setOrderItems([...orderItems, { productName: '', quantity: 1, unitPrice: 0 }]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create New Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Customer ID</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Order Date</label>
          <input
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Order Status</label>
          <input
            type="text"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Order Items</label>
          {orderItems.map((item, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Product Name"
                value={item.productName}
                onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                className="border border-gray-300 p-2 w-full"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="border border-gray-300 p-2 w-full mt-2"
                required
              />
              <input
                type="number"
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                className="border border-gray-300 p-2 w-full mt-2"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="bg-blue-500 text-white p-2 mt-2 rounded"
          >
            Add Item
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded"
        >
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
