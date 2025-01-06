'use client';

import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { createPost, } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getUserData } from '@/lib/storage';

const CreatePostForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const createPostMutation = useMutation({
    mutationFn: ({ title, body }: { title: string; body: string }) => createPost({
      title: title,
      user_id: parseInt(getUserData()?.userId || ''),
      body: body,
      user: getUserData()?.name || ''
    }, getUserData()?.token || ''),
    onSuccess: () => {
      message.success('Post created');
      router.push('/');
    },
    onError: () => {
      message.error('Failed creating post');
    }
  })

  const onFinish = async (values: { title: string; body: string; }) => {
    try {
      createPostMutation.mutate({
        title: values.title,
        body: values.body
      })
      form.resetFields();
    } catch (error) {
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
            id='title-form-item'
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter the title of the post!' },
              { max: 100, message: 'Title cannot exceed 100 characters!' },
            ]}
          >
            <Input disabled={createPostMutation.isPending} placeholder="Enter the post title" />
          </Form.Item>

          <Form.Item
            id='body-form-item'
            label="Body"
            name="body"
            rules={[{ required: true, message: 'Please enter the post content!' }]}
          >
            <Input.TextArea disabled={createPostMutation.isPending} placeholder="Enter the post content" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={createPostMutation.isPending}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CreatePostForm;
