import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Separator,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCurrentUser,
  getProfile,
  getProfilePosts,
} from "../redux/slices/userReducer";
import PostList from "../components/PostList";

export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    profile,
    profileLoading,
    profilePosts,
    profilePostsLoading,
    profilePostsError,
    profileError,
  } = useSelector((state) => state.user);
  useEffect(() => {
    if (id) {
      dispatch(getProfile(id));
      dispatch(getProfilePosts(id));
    } else {
      dispatch(getCurrentUser())
        .unwrap()
        .then((res) => dispatch(getProfilePosts(res.id)));
    }
  }, [id]);
  if (profileError) {
    return (
      <Flex
        mt={"4"}
        direction={"column"}
        justify={"center"}
        style={{ minHeight: "100vh", width: "100%" }}
      >
        <Heading align={"center"}>{profileError}</Heading>
      </Flex>
    );
  }
  return (
    <Flex
      mt={"4"}
      direction={"column"}
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <Flex
        mt={"-2"}
        style={{
          backgroundColor: "var(--plum-3)",
          height: "204px",
          position: "relative",
          width: "100%",
        }}
      >
        <Flex
          justify={"between"}
          align={"end"}
          style={{
            width: "100%",
            position: "absolute",
            padding: "52px 162px",
          }}
        >
          <Skeleton loading={profileLoading}>
            <Avatar
              radius="full"
              fallback="A"
              size={"9"}
              src={profile?.image}
              style={{
                border: "4px solid var(--White, #FFFFFF)",
                backgroundColor: "var(--accent-8)",
                width: "196px",
                height: "196px",
              }}
            />
          </Skeleton>
        </Flex>
        <Flex
          justify={"between"}
          gap={"104px"}
          style={{ padding: "88px 168px 86px 386px" }}
        >
          <Flex direction={"column"} justify={"between"} gap={"2"}>
            <Skeleton loading={profileLoading}>
              <Heading size="3" weight="700" style={{ whiteSpace: "nowrap" }}>
                {profile
                  ? `${profile?.firstName} ${profile?.lastName}`
                  : "Emily Johnson"}
              </Heading>
            </Skeleton>
            <Skeleton loading={profileLoading}>
              <Text size="2" weight="400" style={{ whiteSpace: "nowrap" }}>
                {profile
                  ? `${profile?.company?.title} at ${profile?.company?.name}`
                  : "Sales Manager at Dooley, Kozey and Cronin"}
              </Text>
            </Skeleton>
            <Skeleton loading={profileLoading}>
              <Text size="1" weight="600" style={{ whiteSpace: "nowrap" }}>
                {profile
                  ? `${profile?.address?.city}, ${profile?.address?.country}`
                  : "Phoenix, United States"}
              </Text>
            </Skeleton>
          </Flex>
          <Skeleton loading={profileLoading}>
            <Flex
              justify={"between"}
              align={"center"}
              gap={"2"}
              style={{
                width: "536px",
                height: "94px",
                padding: "12px 52px",
                borderRadius: "4px",
                backgroundColor: "var(--accent-1)",
              }}
            >
              <Flex direction={"column"} gap={"1"}>
                <Heading size="3" weight="700" style={{ whiteSpace: "nowrap" }}>
                  {profile?.company?.name}
                </Heading>
                <Text size="2" weight="400" style={{ whiteSpace: "nowrap" }}>
                  {profile?.company?.department}
                </Text>
                <Text size="1" weight="600" style={{ whiteSpace: "nowrap" }}>
                  {profile?.company?.address?.city},{" "}
                  {profile?.company?.address?.country}
                </Text>
              </Flex>
              <Flex justify={"center"} align={"center"}>
                <Separator orientation={"vertical"} size={"2"} />
              </Flex>
              <Flex direction={"column"} gap={"1"}>
                <Heading size="3" weight="700" style={{ whiteSpace: "nowrap" }}>
                  Education
                </Heading>
                <Text size="2" weight="400" style={{ whiteSpace: "nowrap" }}>
                  {profile?.university}
                </Text>
                <Text size="1" weight="600" style={{ whiteSpace: "nowrap" }}>
                  {profile?.phone}
                </Text>
              </Flex>
            </Flex>
          </Skeleton>
        </Flex>
      </Flex>
      <Flex
        justify={"start"}
        align={"center"}
        gap={"4"}
        style={{
          padding: "12px 0",
          marginLeft: "386px",
        }}
      >
        <Button size={"2"} variant="solid" radius="large">
          Connect
        </Button>
        <Button variant="outline" radius="large">
          Send an email
        </Button>
        <Button size={"2"} variant="outline" radius="large">
          Follow/Unfollow
        </Button>
      </Flex>
      <Separator
        size={"4"}
        style={{
          width: "100%",
        }}
      />
      <Container mt={"5"}>
        <PostList
          posts={profilePosts}
          isError={profilePostsError}
          isLoading={profilePostsLoading}
        />
      </Container>
    </Flex>
  );
}
