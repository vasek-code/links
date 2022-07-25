import {
  Button,
  Flex,
  IconButton,
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "../components/TextInput";
import { trpc } from "../utils/trpc";
import { LoginImage } from "../components/LoginImage";
import Link from "next/link";
import Router from "next/router";
import { Loader } from "../components/Loader";
import { Logo } from "../components/Logo";

const LoginPage: NextPage = () => {
  useEffect(() => {
    setContentWidth(textRef.current?.clientWidth as number);

    window.addEventListener("resize", (e) => {
      setContentWidth(textRef.current?.clientWidth as number);
    });
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(
    new Map<String, String>().set("username", "").set("password", "")
  );
  const [contentWidth, setContentWidth] = useState(490);

  const textRef = useRef<HTMLParagraphElement>(null);

  return (
    <>
      <Logo />
      <Flex w="100%" h="100vh">
        <Flex
          w="100%"
          flexDir="column"
          px="20px"
          mt={["70px", "100px", "100px", "100px"]}
          align="center"
        >
          <Flex maxW="600px" w="100%" flexDir="column" align="center">
            <Flex w="100%" pb="50px" justify="center">
              <Text
                fontSize={["35px", "40px", "48px", "48px"]}
                fontWeight="800"
                letterSpacing={["-1px", "-2px", "-2px", "-2px"]}
                ref={textRef}
              >
                Log in to your Linktree
              </Text>
            </Flex>
            <Flex flexDir="column" w={contentWidth}>
              <Flex pb="0.7rem" flexDir="column" gap="9px" w="100%">
                <Input
                  background="#252525"
                  w="100%"
                  h="45px"
                  placeholder="Username"
                  border={
                    validationError.get("username") && "2px solid #cd3740"
                  }
                  borderColor={validationError.get("username") && "#cd3740"}
                  _hover={{
                    border: "1px solid gray",
                  }}
                  _focusVisible={{
                    border: "2px solid gray",
                  }}
                  fontWeight="semibold"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                />
                {validationError.get("username") && (
                  <Text pl="5px" fontWeight="semibold" color="#cd3740">
                    {validationError.get("username")}
                  </Text>
                )}
              </Flex>
              <Flex w="100%" pb="50px" flexDir="column" gap="9px">
                <Input
                  background="#252525"
                  w="100%"
                  h="45px"
                  placeholder="Password"
                  border={
                    validationError.get("password") && "2px solid #cd3740"
                  }
                  borderColor={validationError.get("password") && "#cd3740"}
                  _hover={{
                    border: "1px solid gray",
                  }}
                  _focusVisible={{
                    border: "2px solid gray",
                  }}
                  fontWeight="semibold"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                />
                {validationError.get("password") && (
                  <Text pl="5px" fontWeight="semibold" color="#cd3740">
                    {validationError.get("password")}
                  </Text>
                )}
              </Flex>
              {/* <Flex w="100%" pb="35px">
                {userLoginMutation.isLoading ? (
                  <IconButton
                    aria-label="loading"
                    icon={
                      <Flex justify="center" align="center">
                        <Loader size="70px" />
                      </Flex>
                    }
                    disabled
                    w="100%"
                    h="45px"
                    borderRadius="64px"
                  />
                ) : (
                  <Button
                    w="100%"
                    h="45px"
                    fontSize="16px"
                    borderRadius="64px"
                    onClick={handleSubmit}
                  >
                    Log In
                  </Button>
                )}
              </Flex> */}
              <Flex w="100%" justify="center" pb="35px">
                <Button variant="link" fontWeight="semibold" color="white">
                  Forgot password?
                </Button>
              </Flex>
              <Text style={{ textAlign: "center" }} fontWeight="semibold">
                Don&apos;t have a Linktree account?{" "}
                <Link href="/signup">
                  <Text
                    as="span"
                    style={{ textAlign: "center", cursor: "pointer" }}
                    _hover={{
                      textDecoration: "underline",
                    }}
                  >
                    Create One
                  </Text>
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <LoginImage />
      </Flex>
    </>
  );
};

export default LoginPage;
