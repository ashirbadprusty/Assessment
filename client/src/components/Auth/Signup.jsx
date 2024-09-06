// src/components/Auth/Signup.jsx
import React from "react";
import { Alert, Button, Form, Input, Select, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import useSignup from "../Hooks/useSignup";
import 'antd/dist/reset.css'; // Ensure Ant Design styles are imported

const { Option } = Select;

const Signup = () => {
  const { loading, error, success, registerUser } = useSignup();

  const handleRegister = (values) => {
    if (values.password !== values.passwordConfirm) {
      return alert("Passwords do not match!");
    }

    registerUser(values);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-8 ">
      {/* Success Message Section */}
      {success && (
        <Alert
          message={success}
          type="success"
          showIcon
          className="mb-6 w-full max-w-lg"
        />
      )}
      {/* Error Message Section */}
      {error && (
        <Alert
          description={error}
          type="error"
          showIcon
          closable
          className="mb-6 w-full max-w-lg"
        />
      )}
      <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-gray-50">
        {/* Form Section */}
        <div className="md:w-1/2 w-full p-8">
          <Typography.Title level={3} strong align="center">
            Create an account
          </Typography.Title>
          <Typography.Text type="secondary" strong align="center" className="block text-center mb-6">
            Join for exclusive access!
          </Typography.Text>
          <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
            <Form.Item
              label="Full Name"
              name="name"
              className="form-item"
              rules={[{ required: true, message: "Please enter your full name!" }]}
            >
              <Input size="large" placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              className="form-item"
              rules={[
                { required: true, message: "Please enter your Email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input size="large" placeholder="Enter your Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              className="form-item"
              rules={[{ required: true, message: "Please enter your Password!" }]}
            >
              <Input.Password size="large" placeholder="Enter your Password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              className="form-item"
              rules={[{ required: true, message: "Please confirm your Password!" }]}
            >
              <Input.Password size="large" placeholder="Re-Enter your Password" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              className="form-item"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select size="large" placeholder="Select your role">
                <Option value="teacher">Teacher</Option>
                <Option value="student">Student</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="btn w-full"
                disabled={loading}
              >
                {loading ? <Spin /> : "Create Account"}
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/login">
                <Button size="large" className="btn w-full">
                  Sign in
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center">
          <img
            src="https://github.com/ashirbadprusty/Register-Login-Authentication/blob/master/client/src/Assets/Register.png?raw=true"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
