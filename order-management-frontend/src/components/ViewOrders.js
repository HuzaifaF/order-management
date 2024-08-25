import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*');

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Customer ID</th>
            <th className="border border-gray-300 p-2">Order Date</th>
            <th className="border border-gray-300 p-2">Order Status</th>
            <th className="border border-gray-300 p-2">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 p-2">{order.id}</td>
              <td className="border border-gray-300 p-2">{order.customer_id}</td>
              <td className="border border-gray-300 p-2">{new Date(order.order_date).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">{order.order_status}</td>
              <td className="border border-gray-300 p-2">${order.total_amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrders;
