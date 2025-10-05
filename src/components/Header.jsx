import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  TabNav,
} from "@radix-ui/themes";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { changeTheme } from "../redux/slices/themeReducer";

export default function Header() {
  const location = useLocation();
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  return (
    <Card>
      <Flex justify={"between"} align="center">
        <Heading>SNS</Heading>
        <TabNav.Root>
          <TabNav.Link asChild active={location.pathname === "/"}>
            <Link to={"/"}>Home</Link>
          </TabNav.Link>
          <TabNav.Link asChild active={location.pathname === "/favourites"}>
            <Link to={"/favourites"}>My Favourites</Link>
          </TabNav.Link>
        </TabNav.Root>
        <Flex gap={"3"} align={"center"}>
          <Link to={"/profile"}>
            <Avatar radius="full" fallback="A" />
          </Link>
          <IconButton size={"3"} onClick={() => dispatch(changeTheme())}>
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
          {isAuth && (
            <IconButton
              size={"3"}
              variant="outline"
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/login");
              }}
            >
              <ExitIcon />
            </IconButton>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
