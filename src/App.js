import React from 'react';
// const dotenv = require('dotenv');
// dotenv.config();
import ViewOrders from './components/ViewOrders';
import CreateOrder from './components/CreateOrder';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const App = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-6">Order Management System</h1>
    <CreateOrder />
    <ViewOrders />
    <AnalyticsDashboard />
  </div>
);

export default App;
