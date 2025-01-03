import React from 'react';
import { Card, Typography, Button } from 'antd';
import { Post } from '@/types/post';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

type PostCardProps = {
  data: Post;
  onReadMore: () => void;
};

const PostCard: React.FC<PostCardProps> = ({ data, onReadMore }) => {
  return (
    <Card
      hoverable
      className='w-full h-[250px] overflow-y-hidden rounded-lg'
      style={{ width: '100%', height: 250, overflowY: 'hidden', borderRadius: 8 }}
    >
      <Title level={4} style={{ marginTop: 16 }}>
        {data.title}
      </Title>
      <Paragraph ellipsis={{ rows: 3 }}>{data.body}</Paragraph>

      <Button onClick={onReadMore} iconPosition='end' icon={<ArrowRightOutlined />}>More Details</Button>
    </Card>
  );
};

export default PostCard;
