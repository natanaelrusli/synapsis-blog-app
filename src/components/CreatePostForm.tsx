'use client';

import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';

const CreatePostForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: { title: string; body: string; userId: number }) => {
    try {
      console.log('Form Values:', values);
      message.success('Post created successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Failed to create post:', error);
      message.error('Failed to create post. Please try again.');
    }
  };

  return (
    <>
      <Card style={{ margin: '0 auto' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ userId: 1 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter the title of the post!' },
              { max: 100, message: 'Title cannot exceed 100 characters!' },
            ]}
          >
            <Input placeholder="Enter the post title" />
          </Form.Item>

          <Form.Item
            label="Body"
            name="body"
            rules={[{ required: true, message: 'Please enter the post content!' }]}
          >
            <Input.TextArea placeholder="Enter the post content" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CreatePostForm;
