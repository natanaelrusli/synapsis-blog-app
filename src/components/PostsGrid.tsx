'use client';

import React from 'react';
import PostCard from './PostCard';
import { fetchPosts } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Button, Col, Row, Skeleton, Spin } from 'antd';
import { RefreshCcw } from 'lucide-react';

const PostsGrid: React.FC = () => {
  const { data: posts, isLoading, error, refetch } = useQuery(
    {
      queryKey: ['posts'],
      queryFn: fetchPosts
    }
  );

  if (isLoading) {
    return (
      <div className="mt-12">
        <div className="flex flex-col gap-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton active key={index} />
          ))}
        </div>
        <Spin fullscreen size="large" tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className='flex flex-col justify-center items-center gap-4'>
          <p className="text-xl text-red-500 font-semibold">
            Failed to load posts.
          </p>
          <Button onClick={() => refetch()} variant='solid' icon={<RefreshCcw />} size='large'>Refresh</Button>
        </div>
      </div>
    );
  }

  return (
    <Row gutter={16}>
      {posts?.map((post) => (
        <Col
          className="gutter-row mb-2 min-h-full"
          xs={24}
          sm={24}
          md={12}
          lg={8}
          xl={8}
          key={post.id}
        >
          <PostCard key={post.id} data={post} />
        </Col>
      ))}
    </Row>
  );
};

export default PostsGrid;
