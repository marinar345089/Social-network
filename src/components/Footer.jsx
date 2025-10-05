import { Flex, Separator, Text } from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Separator mt={"7"} size={"4"} />
      <Flex
        justify={"between"}
        align={"end"}
        style={{ height: "112px", padding: "32px 52px", marginTop: "auto" }}
      >
        <Flex>
          <Text
            size={"2"}
            style={{
              fontWeight: "400",
              fontFamily: "Figtree, sans-serif",
              opacity: "80%",
            }}
          >
            © 2025 SNS
          </Text>
        </Flex>
        <Flex justify={"between"} align={"center"} gap={"32px"}>
          <Link
            to={"/"}
            style={{
              fontWeight: "500",
              fontFamily: "Figtree, sans-serif",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Home
          </Link>
          <Link
            to={"/favourites"}
            style={{
              fontWeight: "500",
              fontFamily: "Figtree, sans-serif",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Favourites
          </Link>
        </Flex>
        <Flex justify={"between"} align={"center"} gap={"32px"}>
          <Link
            href="#"
            size="2"
            style={{
              fontWeight: "500",
              fontFamily: "Figtree, sans-serif",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            size="2"
            style={{
              fontWeight: "500",
              fontFamily: "Figtree, sans-serif",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Terms and Conditions
          </Link>
          <Flex />
        </Flex>
      </Flex>
    </>
  );
}
