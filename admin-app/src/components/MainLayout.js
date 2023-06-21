import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { Outlet, Link } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';

const { Header, Sider, Content } = Layout;
const getuserFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;
//console.log(getuserFromLocalStorage);

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState(getuserFromLocalStorage);
  const navigate = useNavigate();

  useEffect(() => {
    // const users = getuserFromLocalStorage;
    if (users) {
      setUsers(users);
    }
  }, []);

  // if (users === null) {
  //   console.log('null');
  //   navigate('/product');
  // }

  const handleSignout = () => {
    // localStorage.removeItem('user');
    //console.log('The link was clicked.');
    navigate('/');
  };

  console.log(users.admin);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">AP</span>
            <span className="lg-logo">Admin Panel</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key == 'signout') {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className="fs-4" />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className="fs-4" />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: 'Catalog',
              children: [
                {
                  key: 'user',
                  icon: <AiOutlineUser className="fs-4" />,
                  label: 'User Creation',
                },
                {
                  key: 'list-user',
                  icon: <AiOutlineUser className="fs-4" />,
                  label: 'User List',
                },
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Add product',
                },
                {
                  key: 'list-product',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className="fs-4" />,
                  label: 'Brand',
                },
                {
                  key: 'list-brand',
                  icon: <SiBrandfolder className="fs-4" />,
                  label: 'Brand List ',
                },
                {
                  key: 'category',
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: 'Category',
                },
                {
                  key: 'list-category',
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: 'Category List',
                },
              ],
            },
            {
              key: 'orders',
              icon: <FaClipboardList className="fs-4" />,
              label: 'Orders',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <AiOutlineUser className="fs-4" />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{users.admin.name}</h5>
                <p className="mb-0">{users.admin.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: 'auto', lineHeight: '20px' }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item py-1 mb-1"
                    style={{ height: 'auto', lineHeight: '20px' }}
                    onClick={handleSignout}
                  >
                    Signout
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
