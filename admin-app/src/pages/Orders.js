import React, { useEffect } from 'react';
import { Table } from 'antd';
// import { useDispatch, useSelector } from "react-redux";
// import { BiEdit } from 'react-icons/bi';
// import { AiFillDelete } from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import { getOrders } from '../features/auth/authSlice';
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Orders = () => {
  const currentDate = new Date().toLocaleDateString();

  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Random user ${i}`,
      product: 4,
      amount: i + 200,
      date: currentDate,
      action: `to ship`,
    });
  }
  
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
