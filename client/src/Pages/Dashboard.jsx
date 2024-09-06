// Dashboard.js

import React from 'react';
import { Avatar, Button, Card, Flex, Typography } from "antd";
import { useAuth } from "../components/Contexts/AuthContexts";
import { UserOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const { userData, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    
  };

  return (
    <Card className="profile-card">
      {/* {
        userData.map((user,index)=>{
          <ul>
            <li key={index}>{user.name}</li>
          </ul>
        })
      } */}
      <Flex vertical gap="small" align="center">
        <Avatar size={150} icon={<UserOutlined />} className="avatar" />
        <Typography.Title level={2} strong className="username">
         {userData.name}
        </Typography.Title>
        <Typography.Text type="secondary" strong>
          Email: {userData.email}
        </Typography.Text>
        <Typography.Text type="secondary">
          Role: {userData.role}
        </Typography.Text>
        <Button
          size="large"
          type="primary"
          className="profile-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    </Card>
  );
};

export default Dashboard;