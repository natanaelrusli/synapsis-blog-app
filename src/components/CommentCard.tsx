import { PostComment } from '@/types/post'
import { Card, Divider, Typography } from 'antd'
import React from 'react'

type CommentCardProps = {
  comment: PostComment
}

const { Text, Title } = Typography;

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Card key={comment.id}>
      <div className='flex flex-col'>
        <Title style={{ marginBottom: 5 }} level={5}>{ comment.name }</Title>

        <Text style={{ fontSize: 12 }} type='secondary'><a href={`mailto:${comment.email}`}>{ comment.email }</a></Text>
        <Divider style={{ marginBottom: 12, marginTop: 8 }} />
        <Text>{ comment.body }</Text>
      </div>
    </Card>
  )
}

export default CommentCard