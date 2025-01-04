import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Button, Card, Divider, Result, Typography } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import RootLayout from '@/components/layout/RootLayout';
import { Post, PostComment } from '@/types/post';
import { fetchPostComments, fetchPostDetail } from '@/lib/api';
import CommentCard from '@/components/CommentCard';

const { Text } = Typography;

type PostDetailProps = {
  post: Post | null;
  postComments: PostComment[] | undefined;
};

const PostDetail: React.FC<PostDetailProps> = ({ post, postComments }) => {
  if (!post) return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the post not found."
      extra={<Link href={'/'}>
        <Button type="primary">Back Home</Button>
      </Link>}
    />
  );

  return (
    <RootLayout metadata={{
      pageTitle: `${post.title} - Synapsis Blog`
    }}>
      <Card>
        <Link href={'/'}>
          <Button style={{padding:0}} icon={<ArrowLeftOutlined />} type='link'>Back</Button>
        </Link>

        <div className="mb-4">
          <h1 className="text-2xl font-semibold">{post.title}</h1>
        </div>
        <div className="flex gap-2 mb-4">
          <UserOutlined />
          <Text type='secondary'>{post.user_id}</Text>
        </div>

        <div className='mb-4'>
          <Text>{post.body}</Text>
        </div>
      </Card>

      <Divider orientation="left">
        { postComments?.length ? 'Comments' : 'No Comments' }
      </Divider>

      {
        postComments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      }
    </RootLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { id } = params as { id: string };
  const token = req.cookies['api_token'];

  if (!token) {
    return {
      props: {
        error: 'token not found in cookies.',
      },
    };
  }

  try {
    const post = await fetchPostDetail(id, token);
    const postComments = await fetchPostComments(id);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        post: post.data,
        postComments: postComments.data
      }
    };
  } catch (error) {
    console.error('Error fetching post or comments:', error);
    return {
      props: {
        post: null,
        postComments: null
      },
    };
  }
};


export default PostDetail;
