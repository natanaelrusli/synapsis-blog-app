import { GetServerSideProps } from 'next';
import RootLayout from '@/components/layout/RootLayout';
import { withAuth } from '@/hoc/withAuth';
import { ApiResponse } from '@/types/api';
import { fetchUserDetail, fetchUsersPosts } from '@/lib/api';
import { Post, User } from '@/types/post';
import { Avatar, Card, Typography } from 'antd';
import ProfilePostsList from '@/components/ProfilePostsList';
import { getRandomAvatar } from '@/constants/urls';
import Head from 'next/head';

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
      <Head>
        <title>{`${user.name} profile - Synapsis Blog`}</title>
        <meta name="description" content={`This is the profile of ${user.name}`} />
      </Head>
      
      <Typography.Title level={3}>My Profile</Typography.Title>
      <Card>
        <Avatar src={getRandomAvatar} className='mb-3' size={60} />
        <Typography.Title style={{ marginBottom: 1 }} level={4}>{user.name}</Typography.Title>
        <Typography.Link href={`mailto:${user.email}`}>{user.email}</Typography.Link>

        <div className='mt-3'>
          <Typography style={{
            color: user.status === 'active' ? 'green' : 'red'
          }}>
            <strong>Status:</strong> {user.status}
          </Typography>
          <Typography><strong>Gender:</strong> {user.gender}</Typography>
        </div>
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
