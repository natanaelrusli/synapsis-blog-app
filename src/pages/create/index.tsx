'use client';

import React from 'react'
import { Typography } from 'antd';
import RootLayout from '@/components/layout/RootLayout'
import CreatePostForm from '@/components/CreatePostForm'
import { withAuth } from '@/hoc/withAuth';
import Head from 'next/head';

function CreatePost() {
  return (
    <RootLayout>
      <Head>
        <title>Create new post - Synapsis Blog</title>
        <meta name="description" content={`This is where you pour your toughts into beautiful writen posts.`} />
      </Head>

      <Typography.Title level={3}>Create new Post</Typography.Title>
      <CreatePostForm />
    </RootLayout>
  )
}

export default withAuth(CreatePost);