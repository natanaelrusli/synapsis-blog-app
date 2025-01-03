'use client';

import { useState } from 'react';
import { Modal, Form, Input, message, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { api, setApiToken } from '@/lib/api';
import { setUserData } from '@/lib/storage';

interface WelcomeDialogProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function WelcomeDialog({ isOpen, onComplete }: WelcomeDialogProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { name: string; token: string }) => {
    setLoading(true);
    try {
      setApiToken(values.token);
      await api.get('/users');

      setUserData(values.name, values.token);
      message.success('Welcome to the Blog App!');
      onComplete();
    } catch (error) {
      message.error('Invalid API token. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<span className="text-xl font-bold text-blue-500">Welcome to Blog App</span>}
      open={isOpen}
      onCancel={() => {}}
      closable={false}
      centered
      footer={[
        <Button
          key="submit"
          type="primary"
          icon={<LoginOutlined />}
          loading={loading}
          onClick={() => form.submit()}
          className="bg-blue-500 hover:bg-blue-600"
          size="large"
        >
          Get Started
        </Button>,
      ]}
    >
      <div className="pt-3">
        <p className="mb-6 text-gray-600">
          To get started, please enter your name and GoRest API token. You can get your API token by
          registering at{' '}
          <a
            href="https://gorest.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            GoRest
          </a>
        </p>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="token"
            label="API Token"
            rules={[{ required: true, message: 'Please enter your API token' }]}
          >
            <Input.Password placeholder="Enter your GoRest API token" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
