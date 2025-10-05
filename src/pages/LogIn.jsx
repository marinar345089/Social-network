import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Heading,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import Footer from "../components/Footer";
import { BoxIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userReducer";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function toggleVisible() {
    setPasswordVisible((prev) => !prev);
  }
  console.log(agree);
  return (
    <Flex
      mt={"4"}
      direction={"column"}
      style={{
        backgroundColor: "var(--plum-3)",
        minHeight: "70vh",
        width: "100%",
      }}
    >
      <Flex
        justify={"center"}
        align={"center"}
        style={{
          height: "626px",
          padding: "52px 100px",
          gap: "200px",
        }}
      >
        <Flex direction={"column"} justify={"center"} gap={"1"}>
          <Heading
            size="8"
            style={{
              whiteSpace: "nowrap",
              fontFamily: "Figtree",
              fontWeight: "500",
            }}
          >
            Welcome to SNS
          </Heading>
          <Text
            size={"4"}
            style={{
              fontFamily: "Figtree",
              fontWeight: "500",
            }}
          >
            Be great at what you do!
          </Text>
        </Flex>
        <Card size={"4"}>
          <Flex
            direction={"column"}
            gap={"6"}
            style={{
              width: "576px",
            }}
          >
            <Heading
              size={"7"}
              style={{
                fontWeight: "500",
                fontFamily: "Figtree",
              }}
            >
              Get Started - it's Free!
            </Heading>
            <Flex direction={"column"} gap={"3"}>
              <TextField.Root
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Your name"
                variant="ghost"
                style={{
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  background: "transparent",
                  fontWeight: "400",
                  fontFamily: "Figtree",
                }}
              ></TextField.Root>
              <Separator orientation="horizontal" size="4" />
            </Flex>
            <Flex direction={"column"} gap={"3"}>
              <Flex justify={"between"} align={"center"} pr={"4"}>
                <TextField.Root
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  type={passwordVisible ? "text" : "password"}
                  style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    background: "transparent",
                    fontWeight: "400",
                    fontFamily: "Figtree",
                  }}
                ></TextField.Root>
                <Box onClick={toggleVisible}>
                  {passwordVisible ? (
                    <EyeClosedIcon width={"20px"} height={"20px"} />
                  ) : (
                    <EyeOpenIcon width={"20px"} height={"20px"} />
                  )}
                </Box>
              </Flex>
              <Separator orientation="horizontal" size="4" />
            </Flex>
            <Flex>
              <Text
                as="label"
                size="2"
                style={{
                  fontWeight: "400",
                  fontFamily: "Figtree",
                }}
              >
                <Flex gap="2">
                  <Checkbox checked={agree} onCheckedChange={setAgree} />I agree
                  with<b>Privacy Policy</b>and
                  <b>Terms of Use</b>
                </Flex>
              </Text>
            </Flex>
            <Button
              onClick={() =>
                dispatch(loginUser({ username, password }))
                  .unwrap()
                  .then(() => navigate("/"))
              }
              disabled={
                username.trim() === "" || password.trim() === "" || !agree
              }
              size={"4"}
              style={{
                height: "60px",
                padding: "19px 44px",
                borderRadius: "6px",
                fontWeight: "400",
                fontFamily: "Figtree",
              }}
            >
              Join Now
            </Button>
            {loginError && <Text color="red">{loginError}</Text>}
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
