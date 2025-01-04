import { GetServerSideProps } from 'next';
import RootLayout from '@/components/layout/RootLayout';
import { withAuth } from '@/hoc/withAuth';
import { ApiResponse } from '@/types/api';
import { fetchUserDetail, fetchUsersPosts } from '@/lib/api';
import { Post, User } from '@/types/post';
import { Card, Typography } from 'antd';
import EditablePostCard from '@/components/EditablePostCard';
import ProfilePostsList from '@/components/ProfilePostsList';

interface ProfilePageProps {
  user: User | null;
  posts: ApiResponse<Post[]> | null;
  error: string | null;
}

function ProfilePage({ user, posts, error }: ProfilePageProps) {
  if (error) {
    return (
      <RootLayout>
        <div>Error: {error}</div>
      </RootLayout>
    );
  }

  if (!user) {
    return (
      <RootLayout>
        <div>User not found.</div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <Typography.Title level={3}>My Profile</Typography.Title>
      <Card>
        <Typography><strong>Name:</strong> {user.name}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Gender:</strong> {user.status}</Typography>
        <Typography><strong>Status:</strong> {user.gender}</Typography>
      </Card>

      <div className='my-6'>
        <Typography.Title level={4}>My Posts</Typography.Title>
        
        {
          posts?.data && <ProfilePostsList posts={posts?.data} />
        }
      </div>
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const userId = req.cookies['user_id'];
  const token = req.cookies['api_token'];

  if (!userId || !token) {
    return {
      props: {
        user: null,
        posts: null,
        error: 'User ID or API token not found in cookies.',
      },
    };
  }

  try {
    const user = await fetchUserDetail(userId, token);
    const posts = await fetchUsersPosts(userId, token);

    return {
      props: {
        user: user.data,
        posts: posts,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
        posts: null,
        error: error instanceof Error ? error.message : 'An unexpected error occurred.',
      },
    };
  }
};


export default withAuth(ProfilePage);
