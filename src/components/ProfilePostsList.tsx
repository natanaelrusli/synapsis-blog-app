"use client";

import React, { useState } from "react";
import EditablePostCard from "./EditablePostCard";
import { Post } from "@/types/post";
import { Button, Result } from "antd";
import Link from "next/link";

type ProfilePostsListProps = {
  posts: Post[];
};

const ProfilePostsList = ({ posts: initialPosts }: ProfilePostsListProps) => {
  const [posts, setPosts] = useState(initialPosts);

  const removePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  if (!posts.length) {
    return (
      <Result
        style={{
          height: 300
        }}
        status="404"
        title="Sorry, no posts yet.."
        subTitle="Click the button below to start creating one!"
        extra={
          <Link href={'/create'}>
            <Button type="primary">Create a post</Button>
          </Link>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-2 my-4">
      {posts?.map((post) => (
        <EditablePostCard
          key={post.id}
          post={post}
          onDelete={() => removePost(post.id)}
        />
      ))}
    </div>
  );
};

export default ProfilePostsList;
