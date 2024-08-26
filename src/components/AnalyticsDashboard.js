import React, { useEffect } from 'react';
// import { useQuery } from 'react-query';
// import { cubejs } from '../cubejsClient';
import cube from "@cubejs-client/core";
import { CubeProvider, useCubeQuery } from '@cubejs-client/react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { Bar } from "react-chartjs-2";

// import "chartjs-plugin-colorschemes";
// import { RdPu4 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

import moment from "moment";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
const cubeApi = cube(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMDI2NzV9.bxMmsCMS4jWzzRTsr9_efC4EidYEew6jR_SZJ-S5eZw",
    {
      apiUrl:
        "https://indigo-earwig.aws-eu-central-1.cubecloudapp.dev/cubejs-api/v1",
    }
  );

const OrdersChart = () => {
    // const { resultSet, isLoading, error, progress } = useCubeQuery({
    //     measures: ["Orders.count"],
    //     dimensions: ["ProductCategories.name"],
    //     filters: [
    //       {
    //         member: "ProductCategories.name",
    //         operator: "equals",
    //         values: ["Beauty", "Clothing", "Computers", "Electronics"],
    //       },
    //     ],
    //     timeDimensions: [
    //       {
    //         dimension: "Orders.createdAt",
    //         granularity: "month",
    //         dateRange: ["2022-01-01", "2023-01-01"],
    //       },
    //     ],
    //   });
    



    // useEffect(() => {
    //     return () => {
    //       ChartJS.instances.forEach(instance => {
    //         instance.destroy();
    //       });
    //     };
    //   }, []);

    const { resultSet, isLoading, error, progress } = useCubeQuery({
        measures: ['orders.count'],
    timeDimensions: [{
      dimension: 'orders.order_date',
    //   dateRange: 'Last 30 days',
    dateRange: 'Last 12 months',
      granularity: 'month',
    }],
    // dimensions: ['orders.order_date']
      });

    // console.log({resultSet});
    // console.log({isLoading});
    // console.log({error});
    // console.log({progress});
      
    if (isLoading) {
        return (
          <div>
            {(progress && progress.stage && progress.stage.stage) || "Loading..."}
          </div>
        );
      }
    
      if (error) {
        return <div>{error.toString()}</div>;
      }
    
      if (!resultSet) {
        return null;
      }
    //   console.log({resultSet})


  //Transform data for visualization
//   console.log('resultSet', resultSet);
//   console.log('seriesNames', resultSet.seriesNames({
//     x: [],
//     y: ["orders.order_date"],
//   }));
  const labels = resultSet
  .seriesNames({
    x: [],
    y: ["orders.order_date"],
  })
  .map((column) => moment(column.yValues[0]).format("MMMM"));
//   console.log({labels})

//   console.log('series', resultSet.series());
const datasets = resultSet.series().map((item, i) => {
    // console.log('item.title', item['title']);
    // console.log('item.series', item.series);
  return {
    label: item.title,
    data: item.series.map((item) => item.value),
  };
});
// console.log({datasets})

// return (
//   //Visualize the data
//   <Bar
//     data={{
//       labels,
//       datasets,
//     }}
//     options={{
//       legend: {
//         position: "bottom",
//         align: "start",
//       },
//       plugins: {
//         colorschemes: {
//           scheme: RdPu4,
//         },
//       },
//     }}
//   />
// );
// };


//   const { data, error } = useCubeQuery({
    // measures: ['Orders.count'],
    // timeDimensions: [{
    //   dimension: 'Orders.order_date',
    //   dateRange: 'Last 30 days',
    //   granularity: 'day',
    // }],
    // dimensions: ['Orders.order_date']
//   });

//   if (error) {
//     return <div>Error loading chart data: {error.message}</div>;
//   }

//   if (!data) {
//     return <div>Loading...</div>;
//   }



// const chartData = data.map(item => ({
//     date: new Date(item["orders.order_date"]).toLocaleDateString(), // Format the date
//     count: parseInt(item["orders.count"]), // Convert count to an integer
//   }));

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orders Analytics</h1>
      {/* <div className="chart-container"> */}
      <div>
        {/* Implement chart rendering with data */}
        {/* You can use a chart library like Chart.js or Recharts */}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <Bar
    data={{
      labels,
      datasets,
    }}
    options={{
      legend: {
        position: "bottom",
        align: "start",
      },
    //   plugins: {
    //     colorschemes: {
    //       scheme: RdPu4,
    //     },
    //   },
    }}
  />
      </div>
    </div>
  );
}

// console.log({cubejs});
const AnalyticsDashboard = () => (
    <CubeProvider cubeApi={cubeApi}>
{/*   <CubeProvider client={cubejs}> */}
    <OrdersChart />
   </CubeProvider>
);

export default AnalyticsDashboard;
