import { Container, Flex } from "@radix-ui/themes";
import { useEffect } from "react";
import PostList from "../components/PostList";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/slices/postsReducer";

export default function Home() {
  const { posts, postsLoading, currentPage, limit, postsError } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [limit, currentPage]);
  return (
    <Container mt={"6"}>
      <Flex
        gap={"6"}
        align={"start"}
        style={{ minHeight: "100vh", width: "100%" }}
      >
        <PostList
          posts={posts}
          isError={postsError}
          isLoading={postsLoading}
          isPagination={true}
        />
        <Filter />
      </Flex>
    </Container>
  );
}
