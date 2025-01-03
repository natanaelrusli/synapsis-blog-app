'use client';

import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { Post } from '@/types/post';
import { api } from '@/lib/api';
import { Col, Row } from 'antd';

const PostsGrid: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Row gutter={16}>
      {posts.map((post) => (
        <Col className="gutter-row mb-2 min-h-full" xs={24} sm={24} md={12} lg={8} xl={8} key={post.id}>
          <PostCard key={post.id} data={post} onReadMore={() => {}} />
        </Col>
      ))}
    </Row>
  );
};

export default PostsGrid;
