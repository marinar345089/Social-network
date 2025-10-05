import { Container, Heading } from "@radix-ui/themes";
import React from "react";
import PostList from "../components/PostList";
import { useSelector } from "react-redux";

export default function Favourites() {
  const { favourites } = useSelector((state) => state.posts);
  return (
    <Container my={"6"} style={{ minHeight: "100vh", width: "100%" }}>
      <Heading mb={"3"}>My Favourites</Heading>
      <PostList posts={favourites} />
    </Container>
  );
}
