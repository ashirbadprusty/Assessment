import React from 'react';
import { Alert, Button, Card, Form, Input, Spin, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import useLogin from '../Hooks/useLogin';

const Login = () => {
    const { error, loading, loginUser } = useLogin();
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (values) => {
        await loginUser(values);
        if (!error) {
            navigate('/dashboard'); // Redirect to dashboard if login is successful
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100 p-8">
            <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-gray-50">
                {/* Image Section */}
                <div className="md:w-1/2 w-full hidden md:flex items-center justify-center ">
                    <img
                        src="https://github.com/ashirbadprusty/Register-Login-Authentication/blob/master/client/src/Assets/Login.png?raw=true"
                        alt="Login Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Form Section */}
                <div className="md:w-1/2 w-full p-8 flex items-center justify-center ">
                    <Card className="w-full max-w-md shadow-lg rounded-lg ">
                        <Typography.Title level={3} strong align="center">
                            Sign In
                        </Typography.Title>
                        <Typography.Text type="secondary" strong align="center" className="block text-center mb-6">
                            Unlock Your World!
                        </Typography.Text>
                        {error && (
                            <Alert
                                description={error}
                                type="error"
                                showIcon
                                closable
                                className="mb-6"
                            />
                        )}
                        <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
                            <Form.Item
                                label="Email"
                                name="email"
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
                                rules={[{ required: true, message: "Please enter your Password!" }]}
                            >
                                <Input.Password size="large" placeholder="Enter your Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading ? <Spin /> : 'Sign In'}
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Link to="/">
                                    <Button size="large" className="w-full">
                                        Create an account
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
