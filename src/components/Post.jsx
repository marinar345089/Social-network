import {
  BookmarkIcon,
  ChatBubbleIcon,
  ChevronUpIcon,
  EyeOpenIcon,
  HeartIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Box,
  Card,
  ChevronDownIcon,
  Flex,
  Heading,
  IconButton,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../redux/slices/postsReducer";

export default function Post({ post }) {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.posts);
  const isFavourite = favourites.find((el) => el.id === post.id);
  function toggleComments() {
    setIsCommentsOpen((prev) => !prev);
  }
  useEffect(() => {
    axiosInstance.get(`/users/${post.userId}`).then((res) => setUser(res.data));
    axiosInstance
      .get(`/posts/${post.id}/comments`)
      .then((res) => setComments(res.data.comments));
  }, []);
  return (
    <Card>
      <Flex justify={"between"} align={"start"}>
        <Link
          to={`/profile/${user?.id}`}
          style={{ color: "initial", textDecoration: "none" }}
        >
          <Flex gap="3" align="center">
            <Avatar size="3" src={user?.image} radius="full" fallback="T" />
            <Box>
              <Text as="div" size="2" weight="bold">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text as="div" size="2" color="gray">
                {user?.username}
              </Text>
            </Box>
          </Flex>
        </Link>
        <Flex gap={"1"}>
          {post.tags.map((tag) => (
            <Badge key={tag} color="purple">
              {tag}
            </Badge>
          ))}
        </Flex>
      </Flex>
      <Separator my="3" size="4" />
      <Heading mb={"3"}>{post.title}</Heading>
      <Text>{post.body}</Text>
      <Separator my="3" size="4" />
      <Flex justify={"between"} align={"center"}>
        <Flex gap={"5"}>
          <Flex gap={"1"} align={"center"}>
            <HeartIcon />
            <Text>{post.reactions.likes}</Text>
          </Flex>
          <Flex gap={"1"} align={"center"}>
            <EyeOpenIcon />
            <Text>{post.views}</Text>
          </Flex>
          <Flex onClick={toggleComments} gap={"1"} align={"center"}>
            <ChatBubbleIcon />
            <Text>{comments.length}</Text>
            {isCommentsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Flex>
        </Flex>
        <IconButton
          variant={isFavourite ? "classic" : "outline"}
          onClick={() => dispatch(toggleFavourite(post))}
        >
          <BookmarkIcon />
        </IconButton>
      </Flex>
      {isCommentsOpen && (
        <>
          <Separator my="3" size="4" />
          <Flex direction={"column"} gap={"3"}>
            {comments.map((comment) => (
              <Flex key={comment.id} gap={"2"} align={"start"}>
                <Avatar
                  size="1"
                  radius="full"
                  fallback={comment.user.username[0]}
                />
                <Card size={"1"}>
                  <Flex align={"end"} justify={"between"} gap={"2"}>
                    <Box>
                      <Heading size={"2"}>
                        {comment.user.fullName} @{comment.user.username}
                      </Heading>
                      <Text size={"1"}> {comment.body}</Text>
                    </Box>
                    {comment.likes ? (
                      <Flex gap={"1"} align={"center"}>
                        <HeartIcon width={"10px"} height={"10px"} />
                        <Text size={"1"}>{comment.likes}</Text>
                      </Flex>
                    ) : (
                      ""
                    )}
                  </Flex>
                </Card>
              </Flex>
            ))}
          </Flex>
          <Flex gap={"2"} mt={"3"}>
            <TextField.Root
              style={{ width: "100%" }}
              placeholder="Enter your comment"
            ></TextField.Root>
            <IconButton>
              <PaperPlaneIcon />
            </IconButton>
          </Flex>
        </>
      )}
    </Card>
  );
}
