import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Button, Card, Divider, Result, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
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
    <RootLayout>
      <Card>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">{post.title}</h1>
        </div>
        <div className="flex gap-2 mb-4">
          <UserOutlined />
          <Text type='secondary'>{post.user_id}</Text>
        </div>
      
        <Text>{post.body}</Text>
      </Card>

      <Divider orientation="left">Comments</Divider>

      {
        !postComments?.length && (
          <Typography>No Comments</Typography>
        )
      }

      {
        postComments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      }
    </RootLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  try {
    const post: Post = await fetchPostDetail(id);
    const postComments: PostComment[] = await fetchPostComments(id);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: {
        post,
        postComments
      }
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      props: {
        post: null,
      },
    };
  }
};

export default PostDetail;
