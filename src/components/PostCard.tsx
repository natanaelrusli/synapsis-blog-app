import React from 'react';
import { Card, Typography, Button } from 'antd';
import { Post } from '@/types/post';
import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

type PostCardProps = {
  data: Post;
};

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  return (
    <Card
      id='post-card'
      hoverable
      className='w-full h-full overflow-y-hidden rounded-lg'
      styles={{
        body: {
          height: "250px"
        }
      }}
    >
      <div className='flex flex-col justify-between h-full'>
        <div>
          <Title ellipsis={{ rows: 2 }} level={4} style={{ marginTop: 16 }}>
            {data.title}
          </Title>
          <Paragraph ellipsis={{ rows: 3 }}>{data.body}</Paragraph>
        </div>

        <div className='w-full flex flex-col'>
          <Link href={`/${data.id}`}>
            <Button iconPosition='end' icon={<ArrowRightOutlined />}>More Details</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
