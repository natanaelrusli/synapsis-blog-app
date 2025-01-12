'use client';

import React, { useState } from 'react';
import { updatePostDetail } from '@/lib/api';
import { getUserData } from '@/lib/storage';
import { Post } from '@/types/post';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Flex, Input, message, Modal, Typography } from 'antd';
import { useDeletePost } from '@/hooks/api/posts';

type EditablePostCardProps = {
  post: Post;
  onDelete: () => void;
};

const EditablePostCard = ({ post, onDelete }: EditablePostCardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(post.title);
  const [body, setBody] = useState<string>(post.body);
  const token = getUserData()?.token;

  const updatePostMutation = useMutation({
    mutationFn: () =>
      updatePostDetail(
        {
          id: post.id.toString(),
          title: title,
          body: body,
          user_id: post.user_id,
        },
        token
      ),
    onSuccess: () => {
      message.success('Post updated');
      setIsEditing(false);
    },
    onError: () => {
      message.error('Post update failed');
      setTitle(post.title);
      setBody(post.body);
    },
  });

  const deletePostMutation = useDeletePost(onDelete);

  const handleUpdate = () => {
    if (post.title === title && post.body === body) {
      message.info('No data edited');
      setIsEditing(false);
      return;
    }

    updatePostMutation.mutate();
  };

  const handleDelete = () => {
    deletePostMutation.mutate({
      postId: post.id
    });
    setIsModalVisible(false);
  };

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
            <Typography.Title id="title-label-editable-postcard" level={5}>{title}</Typography.Title>
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
        <Button
          danger
          disabled={isEditing}
          loading={deletePostMutation.isPending}
          onClick={() => setIsModalVisible(true)}
        >
          Delete
        </Button>
      </Flex>

      <Modal
        title="Delete Post"
        open={isModalVisible}
        centered
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes"
        cancelText="No"
        okButtonProps={{
          loading: deletePostMutation.isPending,
        }}
        okType='danger'
      >
        <Typography>Are you sure you want to delete this post?</Typography>
      </Modal>
    </Card>
  );
};

export default EditablePostCard;
