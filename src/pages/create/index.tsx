import React from 'react'
import { Typography } from 'antd';
import RootLayout from '@/components/layout/RootLayout'
import CreatePostForm from '@/components/CreatePostForm'
import { withAuth } from '@/hoc/withAuth';

function CreatePost() {
  return (
    <RootLayout>
      <Typography.Title level={3}>Create new Post</Typography.Title>
      <CreatePostForm />
    </RootLayout>
  )
}

export default withAuth(CreatePost);