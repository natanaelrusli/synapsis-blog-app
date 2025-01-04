'use client';

import { useEffect, useState } from 'react';
import { Modal, Form, Input, message, Button, Select } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { api, fetchUsers, setApiToken } from '@/lib/api';
import { setUserData } from '@/lib/storage';
import { User } from '@/types/post';
import { transformUserToSelectValues } from '@/lib/utils';

interface WelcomeDialogProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function WelcomeDialog({ isOpen, onComplete }: WelcomeDialogProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [usersSelect, setUsersSelect] = useState<{ value: number; label: string; }[]>([]);
  
  const fetchUsersList = async () => {
    const response = await fetchUsers();
    setUsersSelect(transformUserToSelectValues(response.data));
  }

  useEffect(() => {
    fetchUsersList();
  }, []);

  const handleSubmit = async (values: { token: string; user: { value: number; label: string } }) => {
    setLoading(true);
    try {
      setApiToken(values.token);
      await api.get('/users');

      setUserData(values.user.label, values.user.value.toString(), values.token);
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
            name="user"
            label="Select User"
            rules={[{ required: true, message: 'Please select a user' }]}
          >
             <Select
              labelInValue
              placeholder="Seelct User to Login"
              options={usersSelect}
            />
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
