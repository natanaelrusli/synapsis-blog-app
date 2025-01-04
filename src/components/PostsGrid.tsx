'use client';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import PostCard from './PostCard';
import { fetchPosts } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Button, Col, Input, Pagination, Row, Skeleton } from 'antd';
import { RefreshCcw } from 'lucide-react';
import { Post } from '@/types/post';
import { debounce } from '@/lib/utils';
import { getUserData } from '@/lib/storage';

const DATA_PER_PAGE = 6;

const LoadingSkeleton = () => (
  <div className="mt-12">
    <div className="flex flex-col gap-10">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton active key={index} />
      ))}
    </div>
  </div>
);

const PostsGrid: React.FC = () => {
  const [filterInput, setFilterInput] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the token when the component mounts
    const userData = getUserData();
    setToken(userData?.token || null);
  }, []);

  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['posts', currentPage, token],
    queryFn: () => fetchPosts(currentPage, DATA_PER_PAGE, token || ''),
    placeholderData: keepPreviousData,
    enabled: !!token,
  });

  const filterPosts = useCallback(
    (filterText: string) => {
      if (posts) {
        const filtered = posts.data.filter((post: Post) =>
          post.title.toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredPosts(filtered);
      }
    },
    [posts]
  );

  const debouncedFilter = useCallback(
    (filterText: string) => {
      debounce(() => filterPosts(filterText), 300)();
    },
    [filterPosts]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderNoDataText = () => {
    if (!filteredPosts.length) {
      return (
        <div className="text-center w-full">
          <p>No Data</p>
        </div>
      );
    }
  };

  const renderFillerCard = () => {
    return Array.from({ length: DATA_PER_PAGE - filteredPosts.length }).map((_, index) => (
      <Col
        className="gutter-row mb-2 min-h-full"
        xs={24}
        sm={24}
        md={12}
        lg={8}
        xl={8}
        key={`placeholder-${index}`}
        style={{
          height: '250px',
          backgroundColor: 'transparent',
        }}
      ></Col>
    ));
  };

  useEffect(() => {
    debouncedFilter(filterInput);
  }, [filterInput, debouncedFilter]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-xl text-red-500 font-semibold">Failed to load posts.</p>
          <Button
            onClick={() => refetch()}
            variant="solid"
            icon={<RefreshCcw />}
            size="large"
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 flex flex-col gap-3">
        <div className="flex flex-col gap-2 justify-center mb-3">
          <label className="font-semibold">Search</label>
          <div className="flex gap-2">
            <Input
              style={{ width: 320 }}
              value={filterInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterInput(e.target.value)}
              placeholder="Search by title"
            />
            <Button onClick={() => setFilterInput('')}>Clear</Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div>
            <Row gutter={16}>
              {renderNoDataText()}

              {filteredPosts.map((post) => (
                <Col
                  className="gutter-row mb-2 min-h-full"
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                  key={post.id}
                >
                  <PostCard key={post.id} data={post} />
                </Col>
              ))}

              {renderFillerCard()}
            </Row>
          </div>

          <div className="mt-8 w-full flex justify-center">
            <Pagination
              defaultCurrent={1}
              current={posts?.meta?.pagination.page}
              total={posts?.meta?.pagination.total}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PostsGrid;
