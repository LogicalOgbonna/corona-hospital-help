import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import React from 'react';
import { auth, signInWithGoogle } from '../../firebase';

const Login = () => {
    const onFinish = async (values: any) => {
        const { email, password } = values;
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (e) {
            notification.error({
                message: 'Invalid Credentials',
                description: e.message
            });
        }
    };
    return (
        <>
            <p className="text-center">Login</p>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input type="email" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button style={{ width: "30%" }} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                                </Button>
                    <Button onClick={() => signInWithGoogle()} style={{ width: "50%", marginLeft: "20%" }} type="primary" className="login-form-button">
                        Sing In With Google
                                </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login
