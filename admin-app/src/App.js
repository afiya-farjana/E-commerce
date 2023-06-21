import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resetpassword from './pages/Resetpassword';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Bandlist';
import Addproduct from './pages/Addproduct';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';
import Productlist from './pages/Productlist';
import AddUser from './pages/Adduser';
import AdminList from './pages/AdminList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-user" element={<AdminList />} />
          <Route path="user" element={<AddUser />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="list-brand" element={<Brandlist />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
