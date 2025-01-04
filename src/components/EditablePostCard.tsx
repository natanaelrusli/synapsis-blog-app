'use client';

import { deletePost, updatePostDetail } from '@/lib/api';
import { getUserData } from '@/lib/storage';
import { Post } from '@/types/post';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Flex, Input, message, Popconfirm, Typography } from 'antd';
import React, { useState } from 'react';

type EditablePostCardProps = {
  post: Post;
  onDelete: () => void
};

const EditablePostCard = ({ post, onDelete }: EditablePostCardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(post.title);
  const [body, setBody] = useState<string>(post.body);
  const token = getUserData()?.token;

  const updatePostMutation = useMutation({
    mutationFn: () => updatePostDetail({
      id: post.id.toString(),
      title: title,
      body: body,
      user_id: post.user_id,
    }, token),
    onSuccess: () => {
      message.success('Post updated');
      setIsEditing(false);
    },
    onError: () => {
      message.error('Post update failed');
      setTitle(post.title);
      setBody(post.body);
    },
  })

  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(post.id.toString(), token || ''),
    onSuccess: () => {
      message.success('Post deleted');
      onDelete();
    },
    onError: () => {
      message.error('Post deletion failed');
    }
  })

  const handleUpdate = () => {
    if (post.title === title && post.body === body) {
      message.info("No data edited");
      setIsEditing(false);
      return;
    }

    updatePostMutation.mutate();
  };

  const handleDelete = () => {
    deletePostMutation.mutate();
  }

  return (
    <Card>
      <Flex vertical className="mb-3">
        {isEditing ? (
          <>
            <Input
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-2"
            />
            <Input.TextArea
              defaultValue={body}
              rows={4}
              onChange={(e) => setBody(e.target.value)}
            />
          </>
        ) : (
          <>
            <Typography.Title level={5}>{title}</Typography.Title>
            <Typography>{body}</Typography>
          </>
        )}
      </Flex>

      <Flex gap="small">
        <Button
          loading={updatePostMutation.isPending} 
          onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
        >
          {isEditing ? 'Update' : 'Edit'}
        </Button>
        <Popconfirm
          title="Delete post"
          description="Are you sure to delete this task?"
          onConfirm={handleDelete}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            disabled={isEditing}
            loading={updatePostMutation.isPending || deletePostMutation.isPending} 
          >
            Delete
          </Button>
        </Popconfirm>
      </Flex>
    </Card>
  );
};

export default EditablePostCard;
