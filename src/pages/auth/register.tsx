import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import React from 'react';
import { auth, createUserProfileDocument } from '../../firebase';

const Register = () => {
    const onFinish = async (values: any) => {
        const { email, password, confirm_password, displayName } = values;
        if (password !== confirm_password) return notification.error({
            message: 'Password Mismatch',
            description:
                'Password and Confirm Password does not match',
        });
        try {
            const { user }: any = await auth.createUserWithEmailAndPassword(email, password);
            const authUser = {
                displayName,
                email: user.email,
                uid: user.uid
            }
            createUserProfileDocument(authUser, {})
        } catch (e) {
            notification.error({
                message: 'User Already Exists',
                description: e.message
            });
        }
    };
    return (
        <>
            <p className="text-center">Register</p>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="displayName"
                    hasFeedback
                    rules={[{
                        required: true,
                        type: 'string',
                        message: 'Please Enter a User Name!',
                    }]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Your Name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    hasFeedback
                    rules={[{
                        required: true,
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    }]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your Confirm Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button style={{ width: "30%" }} type="primary" htmlType="submit" className="login-form-button pull-right">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Register
