import { Flex, Input, Text, Button } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { LoginImage } from "../components/LoginImage";
import { Logo } from "../components/Logo";
import { FcGoogle } from "react-icons/fc";
import { BsTwitch, BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

const AuthPage: NextPage = () => {
  const buttonSize = ["md", "md", "lg", "lg"];

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
          <Flex maxW="550px" w="100%" flexDir="column" align="center">
            <Flex w="100%" pb="50px">
              <Text
                fontSize={["35px", "40px", "40px", "40px"]}
                fontWeight="800"
                letterSpacing={["-1px", "-2px", "-2px", "-2px"]}
              >
                Create or Signin to your account
              </Text>
            </Flex>
            <Flex flexDir="column" w="100%" gap="13px">
              <Button
                rightIcon={<FcGoogle />}
                onClick={() => {
                  signIn("google");
                }}
                size={buttonSize}
                border="1px solid #484848"
              >
                Log in with Google
              </Button>
              <Button
                rightIcon={<BsTwitch />}
                onClick={() => {
                  signIn("twitch");
                }}
                size={buttonSize}
                border="1px solid #484848"
              >
                Log in with Twitch
              </Button>
              <Button
                rightIcon={<BsGithub />}
                onClick={() => {
                  signIn("github");
                }}
                size={buttonSize}
                border="1px solid #484848"
              >
                Log in with Github
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <LoginImage />
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session?.user) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AuthPage;
