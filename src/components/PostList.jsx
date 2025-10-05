import { Box, Flex, Heading, Skeleton } from "@radix-ui/themes";
import React from "react";
import Post from "./Post";
import Pagination from "./Pagination";

export default function PostList({
  posts,
  isLoading,
  isPagination = false,
  isError,
}) {
  const skeletons = [...new Array(3)].map((_, index) => (
    <Skeleton key={index} width={"100%"} height={"284px"} />
  ));
  const renderPosts = posts.map((post) => <Post post={post} key={post.id} />);
  if (isError) {
    return (
      <Box width={"100%"}>
        <Heading align={"center"}>{isError}</Heading>
      </Box>
    );
  }
  return (
    <Box width={"100%"}>
      <Flex direction={"column"} gap={"3"}>
        {isLoading ? skeletons : renderPosts}
        {posts.length === 0 && (
          <Heading align={"center"}>No posts found</Heading>
        )}
      </Flex>
      {isPagination && <Pagination />}
    </Box>
  );
}
